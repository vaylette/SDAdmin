export const baseUrl = 'http://34.207.195.210/api/v1'

export const apiUrls = {
    //--------> Authentication  ------->//
        logIn: `${baseUrl}/auth/login`,

    //--------> End Authentication  ------->//

    //--------> User Management ------->//
        // Get Endpoints
        getUsers: `${baseUrl}/users`,

    //-------->End User Management ------->//


    //--------> Content Management ------->//
        // Get Endpoints
        getTopics: `${baseUrl}/topics`,
        getModels: `${baseUrl}/models/all`,
        getExperiments: `${baseUrl}/experiments/all`,
        getVideos: `${baseUrl}/videos/all`,
        getSubjects: `${baseUrl}/subjects`,
        getLevels: `${baseUrl}/levels`,

        //Post Endpoints
        postTopics: `${baseUrl}/topics`,
        postModels: `${baseUrl}/models`,
        postExperiments: `${baseUrl}/experiments`,
        postVideos: `${baseUrl}/videos`,
        postSubjects: `${baseUrl}/subjects`,

    //-------->End Content Management ------->//



}