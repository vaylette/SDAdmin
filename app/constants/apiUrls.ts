export const baseUrl = 'http://34.207.195.210/api/v1'

export const apiUrls = {
    // Authentication
    logIn: `${baseUrl}/auth/login`,

    // Content Management
    getTopics: `${baseUrl}/topics`,
    getModels: `${baseUrl}/models/all`,
    getExperiments: `${baseUrl}/experiments/all`,
    getVideos: `${baseUrl}/videos/all`,

}