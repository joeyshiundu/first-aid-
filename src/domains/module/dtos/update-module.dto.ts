export interface updateModuleDTO {
    module_id?: number;
    title: string;
    description: string;
    is_active: boolean;
    category: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    created_at?: Date;
    updated_at?: Date;
}