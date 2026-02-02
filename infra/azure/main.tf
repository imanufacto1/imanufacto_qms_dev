terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "rg" {
  name     = "imanufacto-rg"
  location = "East US"
}

# 1. Azure Container Registry
resource "azurerm_container_registry" "acr" {
  name                = "imanufactoacr"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku                 = "Basic" # Lowest cost
  admin_enabled       = true
}

# 2. Azure Container Apps Environment
resource "azurerm_container_app_environment" "env" {
  name                = "imanufacto-env"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
}

# 3. Azure Container App (Serverless)
resource "azurerm_container_app" "app" {
  name                         = "imanufacto-app"
  container_app_environment_id = azurerm_container_app_environment.env.id
  resource_group_name          = azurerm_resource_group.rg.name
  revision_mode                = "Single"

  template {
    container {
      name   = "imanufacto-container"
      image  = "mcr.microsoft.com/azuredocs/containerapps-helloworld:latest" # Placeholder, update after build
      cpu    = 0.25
      memory = "0.5Gi"
      
      env {
        name  = "DATABASE_URL"
        value = "postgresql://..." # Add connection string
      }
    }
  }

  ingress {
    allow_insecure_connections = false
    external_enabled           = true
    target_port                = 3000
    traffic_weight {
      percentage = 100
      latest_revision = true
    }
  }
}

# 4. Azure Database for PostgreSQL (Flexible Server) - Burstable
resource "azurerm_postgresql_flexible_server" "postgres" {
  name                   = "imanufacto-db-server"
  resource_group_name    = azurerm_resource_group.rg.name
  location               = azurerm_resource_group.rg.location
  version                = "16"
  administrator_login    = "adminuser"
  administrator_password = "adminpassword123"
  storage_mb             = 32768
  sku_name               = "B_Standard_B1ms" # Burstable, low cost
  zone                   = "1"
}

resource "azurerm_postgresql_flexible_server_database" "db" {
  name      = "imanufacto"
  server_id = azurerm_postgresql_flexible_server.postgres.id
  collation = "en_US.utf8"
  charset   = "utf8"
}

# Firewall rule to allow access from Azure services
resource "azurerm_postgresql_flexible_server_firewall_rule" "allow_azure" {
  name             = "allow-azure-services"
  server_id        = azurerm_postgresql_flexible_server.postgres.id
  start_ip_address = "0.0.0.0"
  end_ip_address   = "0.0.0.0"
}
