pipeline {
    agent any
    environment {
        PATH = "${env.PATH};C:/Program Files/nodejs/npm"  // Ensure Node.js is in the PATH
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/KhushiChoubey26/IceCream-Feedback-Form.git'
            }
        }
        
        stage('Build') {
            steps {
                script {
                    echo 'Building the code...'
                    bat 'npm install'  // Install project dependencies
                    echo 'DONE Building the code...'
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    echo 'Running tests...'
                    bat 'npm test'  // Run tests using npm
                }
            }
        }

        stage('Code Quality') {
            steps {
                script {
                    echo 'Running SonarQube analysis...'
                    withSonarQubeEnv('SonarQube') {  // SonarQube should be correctly configured
                        bat 'npx sonar-scanner'  // Run SonarQube scanner
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    echo 'Deploying the application...'
                    bat 'docker-compose up -d'  // Deploy the app using Docker Compose
                }
            }
        }

        stage('Release') {
            steps {
                script {
                    echo 'Releasing the application to production...'
                    bat 'aws deploy push --application-name MyApp --s3-location s3://mybucket/MyApp.zip'  // Ensure AWS CLI is configured
                }
            }
        }

        stage('Monitoring') {
            steps {
                script {
                    echo 'Setting up monitoring...'
                    bat 'datadog-agent start'  // Start Datadog agent for monitoring
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
            // Optional: Add notification here (e.g., email, Slack)
        }
        failure {
            echo 'Pipeline failed.'
            // Optional: Add notification here for failure
        }
    }
}
