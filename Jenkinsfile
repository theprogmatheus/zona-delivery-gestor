node {
    def WORKSPACE = "/var/lib/jenkins/workspace/zona-delivery-gestor"
    def dockerImageTag = "zona-delivery-gestor-${env.BUILD_NUMBER}"

    try{
         stage('Clone Git Repository') {
            git url: 'https://github.com/theprogmatheus/zona-delivery-gestor.git',
                credentialsId: 'Git',
                branch: 'master'
         }
         
          stage('Build Docker Image') {
                 dockerImage = docker.build("zona-delivery-gestor:${env.BUILD_NUMBER}")
                 echo "DockerImage: ${dockerImage}"
          }
         
          stage('Deploy Docker Image'){
                  echo "Docker Image Tag Name: ${dockerImageTag}"
                  sh "docker stop zona-delivery-gestor || true && docker rm zona-delivery-gestor || true"
                  sh "docker run --name zona-delivery-gestor -d -p 127.0.0.1:8001:80 --env-file /var/env/zona-delivery-gestor.env zona-delivery-gestor:${env.BUILD_NUMBER}"
          }
          
    }catch(e){
        throw e
    }finally{
//         notifyBuild(currentBuild.result)
    }
}