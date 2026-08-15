pipeline {
    agent any

    environment {
        NODE_VERSION = '20'
        PROJECT_NAME = 'nuevo-portfolio'
        DIST_PATH = 'build'
        FRONTEND_REMOTE_DIR = 'nuevo-portfolio'
        SERVER3_HOST = 'deploy@10.0.0.3'
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timeout(time: 30, unit: 'MINUTES')
        timestamps()
        ansiColor('xterm')
    }

    stages {
        stage('Checkout') {
            steps {
                echo "Checking out branch: ${env.BRANCH_NAME}"
                checkout scm
            }
        }

        stage('Setup Node.js') {
            steps {
                sh '''
                    set -e
                    node --version
                    npm --version
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm ci --legacy-peer-deps'
            }
        }

        stage('Build Production') {
            steps {
                echo 'Building Docusaurus (build/)...'
                sh '''
                    set -e
                    npm run build
                    test -f build/index.html || (echo "ERROR: build/index.html no generado" && exit 1)
                '''
            }
            post {
                success {
                    archiveArtifacts artifacts: 'build/**/*', fingerprint: true
                }
            }
        }

        stage('Deploy Prod Server 3') {
            steps {
                echo "Deploying ${PROJECT_NAME} → Server 3 /opt/frontends/${FRONTEND_REMOTE_DIR}"
                sh """
                    set -e
                    chmod +x scripts/frontend-prod-deploy.sh
                    ./scripts/frontend-prod-deploy.sh '${DIST_PATH}' '${FRONTEND_REMOTE_DIR}'
                """
            }
        }
    }

    post {
        always {
            sh 'rm -rf node_modules build .docusaurus || true'
        }
        success {
            echo "✅ Prod: ${PROJECT_NAME} → https://antoniosaborido.es (/opt/frontends/${FRONTEND_REMOTE_DIR})"
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
