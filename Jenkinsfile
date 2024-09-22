pipeline {
    agent any  // This specifies that the pipeline can run on any available Jenkins agent
    environment {
        PATH = "${env.PATH};C:/Program Files/nodejs/npm"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/sreedharashwin/simple-java-springboot.git'
            }
        }
        
        stage('Build') {
            steps {
                script {
                    echo 'Building the code...'
                    def status = sh script: 'npm install', returnStatus: true
                    if (status != 0) {
                        error "Build failed"
                    }
                    echo 'DONE Building the code...'
                }
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                def status = sh script: 'npm test', returnStatus: true
                if (status != 0) {
                    error "Test failed"
                }
            }
        }

        stage('Code Quality') {
            steps {
                echo 'Running code quality checks...'
                def status = sh script: 'npm run lint', returnStatus: true
                if (status != 0) {
                    error "Code quality check failed"
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying the application...'
                def status = sh script: 'git push heroku main', returnStatus: true
                if (status != 0) {
                    error "Deployment failed"
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
