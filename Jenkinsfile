pipeline {
    agent any

    environment {
        // Configuración de Node.js
        NODE_VERSION = '20'
        // Variables de deployment
        PROJECT_NAME = 'nuevo-portfolio'
        DIST_PATH = 'build'
        NGINX_PATH = '/var/www/frontends/nuevo-portfolio'
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
                script {
                    echo "Checking out code from branch: ${env.BRANCH_NAME}"
                    checkout scm
                }
            }
        }

        stage('Setup Node.js') {
            steps {
                script {
                    sh """
                        # Verificar/instalar Node.js
                        if ! command -v node &> /dev/null; then
                            echo "Node.js no encontrado, instalando..."
                            # Aquí puedes usar nvm o instalar Node.js según tu entorno
                        fi
                        node --version
                        npm --version
                    """
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    echo "Installing dependencies..."
                    sh """
                        npm ci --legacy-peer-deps
                    """
                }
            }
        }

        // Tests deshabilitados temporalmente
        /*
        stage('Test') {
            steps {
                script {
                    echo "Running tests..."
                    sh """
                        npm run typecheck || echo "Typecheck not configured"
                    """
                }
            }
        }
        */

        stage('Build') {
            steps {
                script {
                    echo "Building application..."
                    sh """
                        npm run build
                    """
                }
            }
            post {
                success {
                    archiveArtifacts artifacts: 'build/**/*', fingerprint: true
                }
            }
        }

        stage('Deploy to Nginx') {
            steps {
                script {
                    echo "Deploying ${PROJECT_NAME} to Nginx..."
                    sh """
                        # Verificar estructura de build
                        echo "📂 Estructura de build/:"
                        ls -la build/ || echo "build/ no existe"

                        # Intentar diferentes rutas posibles
                        SOURCE_PATH=""
                        if [ -d "${DIST_PATH}" ]; then
                            SOURCE_PATH="${DIST_PATH}"
                        else
                            echo "ERROR: No se encontró el directorio de build!"
                            echo "Buscando en:"
                            echo "  - ${DIST_PATH}"
                            find . -type d -name "dist" -o -name "build" 2>/dev/null | head -10 || true
                            exit 1
                        fi

                        echo "✅ Usando directorio fuente: \$SOURCE_PATH"
                        echo "📂 Contenido de \$SOURCE_PATH:"
                        ls -la "\$SOURCE_PATH"/

                        # Crear directorio de destino con permisos
                        mkdir -p ${NGINX_PATH}
                        chmod 755 ${NGINX_PATH}

                        # Limpiar archivos antiguos
                        rm -rf ${NGINX_PATH}/* ${NGINX_PATH}/.[!.]* 2>/dev/null || true

                        # Copiar archivos buildeados
                        cp -r "\$SOURCE_PATH"/* ${NGINX_PATH}/ 2>&1

                        # Verificar que se copiaron
                        echo "✅ Archivos copiados a ${NGINX_PATH}:"
                        ls -la ${NGINX_PATH}/ | head -20

                        # Verificar que hay archivos
                        FILE_COUNT=\$(find ${NGINX_PATH} -type f | wc -l)
                        if [ "\$FILE_COUNT" -eq 0 ]; then
                            echo "ERROR: No se copiaron archivos!"
                            exit 1
                        fi

                        echo "✅ Deployment completed successfully! (\$FILE_COUNT archivos)"
                    """
                }
            }
        }
    }

    post {
        always {
            script {
                // Limpiar archivos temporales
                try {
                    sh 'rm -rf node_modules || true'
                } catch (Exception e) {
                    echo "No se pudo limpiar archivos temporales: ${e.getMessage()}"
                }
            }
        }
        success {
            echo "Pipeline completed successfully!"
            echo "✅ ${PROJECT_NAME} deployed and available at ${NGINX_PATH}"
        }
        failure {
            echo "Pipeline failed!"
        }
        unstable {
            echo "Pipeline is unstable"
        }
    }
}
