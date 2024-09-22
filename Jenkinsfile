pipeline {
    agent any  // This specifies that the pipeline can run on any available Jenkins agent

    stages {
        stage('Build') {
            steps {
                echo 'Building the project...'
                // Add build steps here
                // For a Node.js project, for example, you'd run `npm install`
                ls -l
                pwd
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                // Add test steps here, for example using a test framework like Jest or Mocha
                sh 'npm test'
            }
        }

        stage('Code Quality') {
            steps {
                echo 'Running code quality checks...'
                // Add code quality analysis step, for example using ESLint
                sh 'npm run lint'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying the application...'
                // Add deployment steps here
                // For example, you might want to deploy to a staging environment or a Docker container
                // Example for deploying to Heroku:
                sh 'git push heroku main'
            }
        }

        stage('Release') {
            steps {
                echo 'Releasing to production...'
                // Add release steps here
                // Example for promoting from staging to production:
                // sh 'deploy-to-prod.sh' or similar
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
