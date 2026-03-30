pipeline {
    agent any

    environment {
        ENV = "mock"
        CI = "true"
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

        // 🔥 CRÍTICO: asegurar carpetas
        stage('Ensure Report Folders') {
            steps {
                bat '''
                if not exist playwright-report mkdir playwright-report
                if not exist reports mkdir reports
                '''
            }
        }

        // 🔍 DEBUG (puedes quitar luego)
        stage('Debug Reports') {
            steps {
                bat 'echo ==== WORKSPACE FILES ===='
                bat 'dir'
                bat 'echo ==== PLAYWRIGHT REPORT ===='
                bat 'dir playwright-report'
                bat 'echo ==== AI REPORT ===='
                bat 'dir reports'
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
                    allowMissing: true   // 🔥 evita fallo si está vacío
                ])
            }
        }

        stage('Publish AI Dashboard') {
            steps {
                publishHTML(target: [
                    reportDir: 'reports',
                    reportFiles: 'ai-report.html',
                    reportName: 'AI Dashboard',
                    keepAll: true,
                    alwaysLinkToLastBuild: true,
                    allowMissing: true   // 🔥 evita fallo
                ])
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**, reports/**', allowEmptyArchive: true
        }

        success {
            echo '✅ Pipeline ejecutado correctamente'
        }

        failure {
            echo '❌ Pipeline falló - revisar reportes'
        }
    }
}