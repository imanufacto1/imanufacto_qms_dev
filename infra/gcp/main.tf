terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "4.51.0"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

# 1. Cloud Run (Serverless Container)
resource "google_cloud_run_service" "default" {
  name     = "imanufacto-service"
  location = var.region

  template {
    spec {
      containers {
        image = "gcr.io/${var.project_id}/imanufacto:latest"
        ports {
          container_port = 3000
        }
        env {
          name  = "DATABASE_URL"
          value = "postgresql://user:pass@/imanufacto?host=/cloudsql/${google_sql_database_instance.instance.connection_name}"
        }
      }
    }
    
    metadata {
      annotations = {
        "run.googleapis.com/cloudsql-instances" = google_sql_database_instance.instance.connection_name
        "autoscaling.knative.dev/maxScale"      = "5" # Cost control
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}

# Allow unauthenticated access (public website)
resource "google_cloud_run_service_iam_member" "member" {
  service  = google_cloud_run_service.default.name
  location = google_cloud_run_service.default.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}

# 2. Cloud SQL (Postgres) - Cost Optimized
resource "google_sql_database_instance" "instance" {
  name             = "imanufacto-db-instance"
  database_version = "POSTGRES_15"
  region           = var.region

  settings {
    tier = "db-f1-micro" # Smallest available (shared core)
    availability_type = "ZONAL" # Single zone (cheaper)
    
    ip_configuration {
        ipv4_enabled = true
    }
  }
  deletion_protection  = false # For dev/test
}

resource "google_sql_database" "database" {
  name     = "imanufacto"
  instance = google_sql_database_instance.instance.name
}

resource "google_sql_user" "users" {
  name     = "adminuser"
  instance = google_sql_database_instance.instance.name
  password = "adminpassword123"
}

variable "project_id" {
  description = "GCP Project ID"
}

variable "region" {
  default = "us-central1"
}
