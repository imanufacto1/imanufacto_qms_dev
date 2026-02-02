terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# 1. ECR Repository for container image
resource "aws_ecr_repository" "app_repo" {
  name = "imanufacto-repo"
}

# 2. App Runner Service (Serverless Container)
resource "aws_apprunner_service" "imanufacto_service" {
  service_name = "imanufacto-service"

  source_configuration {
    image_repository {
      image_identifier      = "${aws_ecr_repository.app_repo.repository_url}:latest"
      image_repository_type = "ECR"
      image_configuration {
        port = "3000"
        runtime_environment_variables = {
          DATABASE_URL = aws_db_instance.postgres.address # Simplified, use Secrets Manager in prod
        }
      }
    }
    auto_deployments_enabled = true
    authentication_configuration {
      access_role_arn = aws_iam_role.apprunner_role.arn
    }
  }

  network_configuration {
    egress_configuration {
      egress_type       = "VPC"
      vpc_connector_arn = aws_apprunner_vpc_connector.connector.arn
    }
  }
}

# 3. IAM Role for App Runner
resource "aws_iam_role" "apprunner_role" {
  name = "apprunner-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = { Service = "build.apprunner.amazonaws.com" }
    }]
  })
}

# 4. RDS Postgres (Free Tier / Cost Optimized)
resource "aws_db_instance" "postgres" {
  allocated_storage    = 20
  storage_type         = "gp2"
  engine               = "postgres"
  engine_version       = "16.3"
  instance_class       = "db.t3.micro" # Free tier eligible
  db_name              = "imanufacto"
  username             = "adminuser"
  password             = "adminpassword123" # Use vars in real setup
  skip_final_snapshot  = true
  publicly_accessible  = false
  vpc_security_group_ids = [aws_security_group.db_sg.id]
  db_subnet_group_name   = aws_db_subnet_group.default.name
}

# 5. Networking (Simplified)
resource "aws_default_vpc" "default" {}

resource "aws_security_group" "db_sg" {
  name        = "db-sg"
  description = "Allow App Runner access"
  vpc_id      = aws_default_vpc.default.id

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Restrict to VPC/Connector in prod
  }
}

resource "aws_apprunner_vpc_connector" "connector" {
  vpc_connector_name = "imanufacto-vpc-connector"
  subnets            = [aws_default_subnet.default_subnet_a.id, aws_default_subnet.default_subnet_b.id]
  security_groups    = [aws_security_group.db_sg.id]
}

resource "aws_default_subnet" "default_subnet_a" {
  availability_zone = "${var.aws_region}a"
}

resource "aws_default_subnet" "default_subnet_b" {
  availability_zone = "${var.aws_region}b"
}

resource "aws_db_subnet_group" "default" {
  name       = "main"
  subnet_ids = [aws_default_subnet.default_subnet_a.id, aws_default_subnet.default_subnet_b.id]
}

variable "aws_region" {
  default = "us-east-1"
}
