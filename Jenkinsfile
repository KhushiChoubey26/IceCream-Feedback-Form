pipeline {
    agent any
    
    environment {
        PATH = "${env.PATH};C:/Program Files/nodejs/npm"  // Ensure Node.js and npm are in the PATH
    }

    stages {
        stage('Clone Repository') {
            steps {
                // Cloning the repository from GitHub
                git branch: 'main', url: 'https://github.com/KhushiChoubey26/IceCream-Feedback-Form.git'
            }
        }
        
        stage('Build') {
            steps {
                script {
                    echo 'Building the code...'
                    // Install npm dependencies
                    bat 'npm install'
                    echo 'DONE Building the code...'
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    echo 'Running tests...'
                    // Running npm test command to execute unit tests
                    bat 'npm test'
                }
            }
        }

        stage('Code Quality') {
            steps {
                script {
                    echo 'Running code quality checks...'
                    // Running linting to ensure code quality
                    bat 'npm run lint'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    echo 'Deploying the application...'
                    
                    // Ensure Docker is installed and running on the Jenkins agent
                    bat 'docker-compose up -d'  // Start services in detached mode
                    
                    // Verify if the containers are running successfully
                    bat 'docker ps'  // Check the status of running containers
                }
            }
        }

        stage('Release') {
            steps {
                script {
                    echo 'Releasing the application to production...'
                    
                    // AWS CLI needs to be configured with the right credentials
                    // Make sure that the AWS CLI is set up and authorized
                    bat 'aws deploy push --application-name MyApp --s3-location s3://mybucket/MyApp.zip'
                    
                    // Optionally, include more AWS commands like deploy to Elastic Beanstalk or EC2
                }
            }
        }

        stage('Monitoring') {
            steps {
                script {
                    echo 'Setting up monitoring...'
                    
                    // Ensure Datadog agent is installed on the machine
                    bat 'datadog-agent start'  // Starts the Datadog monitoring agent
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
            // You can integrate a notification system here, such as email or Slack
        }
        failure {
            echo 'Pipeline failed.'
            // Handle failures, possibly by sending alerts
        }
    }
}
