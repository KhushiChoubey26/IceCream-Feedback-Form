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
                    echo 'Running code quality checks...'
                    bat 'npm run lint'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    echo 'Deploying the application...'
                   // bat 'git push heroku main'
                }
            }
        }

        stage('Release') {
            steps {
                echo 'Releasing to production...'
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
