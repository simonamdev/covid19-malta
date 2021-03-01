pipeline {
    agent none
    stages {
        stage('Retrieve Latest Data') {
            agent {
                docker { image 'python:3' }
            }
            steps {
                sh 'pip install -r requirements.txt'
                sh 'python download_latest.py'
                sh 'python convert_latest.py'
                stash(name: 'latest_data', includes: 'data/latest_data.json')
            }
        }
        stage('Build Website') {
            agent {
                docker { image 'node:14-alpine' }
            }
            steps {
                unstash('latest_data')
                dir('website') {
                    sh 'yarn'
                    sh 'yarn run build'
                    archiveArtifacts artifacts: 'public/**/*'
                    stash(name: 'website', includes: 'public/**/*')
                }
            }
        }
        stage('Deploy to VPS') {
            steps {
                unstash('website')
                sh 'du -h public'
                sh 'echo TODO!'
            }
        }
    }
}
