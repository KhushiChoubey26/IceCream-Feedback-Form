pipeline {
    agent any
    environment {
        PATH = "${env.PATH};C:/Program Files/nodejs/npm"
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
                    bat 'npm install'
                    echo 'DONE Building the code...'
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    echo 'Running tests...'
                    bat 'npm test'
                }
            }
        }

        stage('Code Quality') {
            steps {
                script {
                    echo 'Running SonarQube analysis...'
                    withSonarQubeEnv('SonarQube') {
                        bat 'npx sonar-scanner'
                    }
                }
            }
        }
         stage('Deploy') {
            steps {
                script {
                    echo 'Deploying the application...'
                    bat 'docker-compose up -d' // Deploy to a staging environment
                }
            }
        }



        stage('Release') {
            steps {
                script {
                    echo 'Releasing the application to production...'
                    bat 'aws deploy push --application-name MyApp --s3-location s3://mybucket/MyApp.zip'
                }
            }
        }

        stage('Monitoring') {
            steps {
                script {
                    echo 'Setting up monitoring...'
                    bat 'datadog-agent start'
                }
            }
        }
    }


    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
