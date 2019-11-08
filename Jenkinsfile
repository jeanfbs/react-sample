node{
    ws {
        stage('checkout') {
            checkout(scm)
        }

        stage('Install') {
            sh "npm install"
        }

        stage('Test') {
            //sh "mvn test -Pprd"
        }

        stage('Run') {
            sh "sudo service makeofferfe restart"
        }
    }

}