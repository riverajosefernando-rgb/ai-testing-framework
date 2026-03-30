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

        // 🔥 Crear carpetas ANTES de ejecutar
        stage('Prepare Report Folders') {
            steps {
                bat '''
                if not exist playwright-report mkdir playwright-report
                if not exist reports mkdir reports
                if not exist allure-results mkdir allure-results
                '''
            }
        }

        stage('Run AI Tests') {
            steps {
                bat 'npx playwright test'
            }
        }

        // 🔍 Debug útil
        stage('Debug Reports') {
            steps {
                bat 'echo ==== WORKSPACE ===='
                bat 'dir'
                bat 'echo ==== PLAYWRIGHT ===='
                bat 'dir playwright-report'
                bat 'echo ==== AI REPORT ===='
                bat 'dir reports'
                bat 'echo ==== ALLURE ===='
                bat 'dir allure-results'
            }
        }

        // 🔥 PLAYWRIGHT (NO publishHTML ❌)
        stage('Archive Playwright Report') {
            steps {
                archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
            }
        }

        // 📊 AI Dashboard (SÍ HTML)
        stage('Publish AI Dashboard') {
            steps {
                publishHTML(target: [
                    reportDir: 'reports',
                    reportFiles: 'ai-report.html',
                    reportName: 'AI Dashboard',
                    keepAll: true,
                    alwaysLinkToLastBuild: true,
                    allowMissing: true
                ])
            }
        }

        // 🚀 ALLURE
        stage('Publish Allure Report') {
            steps {
                allure([
                    includeProperties: false,
                    jdk: '',
                    results: [[path: 'allure-results']]
                ])
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**, reports/**, allure-results/**', allowEmptyArchive: true
        }

        success {
            echo '✅ Pipeline ejecutado correctamente'
        }

        failure {
            echo '❌ Pipeline falló - revisar reportes'
        }
    }
}