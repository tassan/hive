# main.tf
provider "aws" {
  region = "your-aws-region"
}

resource "aws_instance" "api_server" {
  ami           = "ami-12345678" # Specify your preferred AMI ID
  instance_type = "t2.micro"     # Specify instance type
  tags = {
    Name = "api-server"
  }

  # Security group configuration for allowing incoming HTTP traffic
  security_groups = ["api-server-sg"]
}

resource "aws_security_group" "api_server_sg" {
  name        = "api-server-sg"
  description = "Security group for API server"
  
  # Ingress rule to allow incoming HTTP traffic on port 80
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
