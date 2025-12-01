pipeline {
    agent any

    environment {
        // Définit l'outil scanner configuré dans Jenkins
        SCANNER_HOME = tool 'SonarScanner'
    }

    stages {
        stage('Checkout') {
            steps {
                // Récupère le code (pour le TP local, on utilise le dossier courant)
                // Dans la vraie vie, ce serait : git 'https://github.com/votre/repo.git'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'docker-compose exec -T backend composer install'
                sh 'docker-compose exec -T frontend npm install'
            }
        }

        stage('Tests Backend') {
            steps {
                // Lance les tests PHPUnit dans le conteneur
                sh 'docker-compose exec -T backend php artisan test'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('MySonarServer') {
                    sh "${SCANNER_HOME}/bin/sonar-scanner"
                }
            }
        }

        stage('Build & Deploy (Staging)') {
            steps {
                // Reconstruit les images et relance les conteneurs
                sh 'docker-compose up -d --build'
            }
        }
    }
}