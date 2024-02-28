export const baseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT

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
        getModels: `${baseUrl}/models`,
        getExperiments: `${baseUrl}/experiments`,
        getVideos: `${baseUrl}/videos`,
        getSubjects: `${baseUrl}/subjects`,
        getLevels: `${baseUrl}/levels`,
        getChapters: `${baseUrl}/chapters`,
        getQuestions: `${baseUrl}/questions`,

        //Post Endpoints
        postTopics: `${baseUrl}/topics`,
        postModels: `${baseUrl}/models`,
        postExperiments: `${baseUrl}/experiments`,
        postVideos: `${baseUrl}/videos`,
        postSubjects: `${baseUrl}/subjects`,
        postChapters: `${baseUrl}/chapters`,
        postQuestions: `${baseUrl}/questions`,
        //Put Endpoints
        patchTopics: `${baseUrl}/topics`,
        patchModels: `${baseUrl}/models`,
        patchExperiments: `${baseUrl}/experiments`,
        patchVideos: `${baseUrl}/videos`,
        // Delete Endpoints
        deleteTopic: `${baseUrl}/topics`,
        deleteChapter: `${baseUrl}/chapters`,
        deleteQuestion: `${baseUrl}/questions`,

    //-------->End Content Management ------->//



}