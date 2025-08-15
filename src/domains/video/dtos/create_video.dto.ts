export interface CreateVideoDto {
    video_id: number; // Unique identifier for the video
    title: string; // Title of the video
    description: string; // Description of the video
    url: string; // URL of the video
    thumbnail_url: string; // URL of the video's thumbnail image
    duration: number; // Duration of the video in seconds
    category: string; // Category of the video (e.g., first aid, CPR,emergency response)
    created_at: Date; // Date when the video was created
    updated_at: Date; // Date when the video was last updated
    user_id: number; // ID of the user who uploaded the video
    is_public: boolean; // Whether the video is public or private
    views: number; // Number of views the video has received
    likes: number; // Number of likes the video has received
    dislikes: number; // Number of dislikes the video has received  
    tags: string[]; // Tags associated with the video for better searchability
    module_id: number; // Foreign key to associate the video with a specific module

}