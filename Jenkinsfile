pipeline {
    agent any

    environment {
        ENV = "mock"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/riverajosefernando-rgb/ai-testing-framework.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Run AI Tests') {
            steps {
                bat 'npx playwright test'
            }
        }

        stage('Publish Playwright Report') {
            steps {
                publishHTML(target: [
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright Report',
                    keepAll: true,
                    alwaysLinkToLastBuild: true,
                    allowMissing: false
                ])
            }
        }

        stage('Publish AI Dashboard') {
            steps {
                publishHTML(target: [
                    reportDir: 'reports', // 🔥 IMPORTANTE (no root)
                    reportFiles: 'ai-report.html',
                    reportName: 'AI Dashboard',
                    keepAll: true,
                    alwaysLinkToLastBuild: true,
                    allowMissing: false
                ])
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**, reports/**', allowEmptyArchive: true
        }
    }
}