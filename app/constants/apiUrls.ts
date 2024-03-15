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
        getSimulations: `${baseUrl}/simulations`,

        //Post Endpoints
        postTopics: `${baseUrl}/topics`,
        postModels: `${baseUrl}/models`,
        postExperiments: `${baseUrl}/experiments`,
        postVideos: `${baseUrl}/videos`,
        postSubjects: `${baseUrl}/subjects`,
        postChapters: `${baseUrl}/chapters`,
        postQuestions: `${baseUrl}/questions`,
        postSimulations: `${baseUrl}/simulations`,
        //Put Endpoints
        patchTopics: `${baseUrl}/topics`,
        patchModels: `${baseUrl}/models`,
        patchExperiments: `${baseUrl}/experiments`,
        patchVideos: `${baseUrl}/videos`,
        patchSimulations: `${baseUrl}/simulations`,
        // Delete Endpoints
        deleteTopic: `${baseUrl}/topics`,
        deleteChapter: `${baseUrl}/chapters`,
        deleteQuestion: `${baseUrl}/questions`,
        deleteModels: `${baseUrl}/models`,
        deleteExperiments: `${baseUrl}/experiments`,
        deleteVideos: `${baseUrl}/videos`,
        deleteSimulations: `${baseUrl}/simulations`,

    //-------->End Content Management ------->//


    //-----------------OverView --------------------//
        getOverview: `${baseUrl}/overview`,
        getNotifications: `${baseUrl}/overview/notifications`



}