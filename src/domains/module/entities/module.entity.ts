//This file is created to define the ModuleEntity that represents the structure of a module in the system.

export interface ModuleEntity {
    module_id: number;
    title: string;
    description: string;
    is_active: 'active' | 'not in service';
    category: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    created_at: Date;
    updated_at: Date;


}