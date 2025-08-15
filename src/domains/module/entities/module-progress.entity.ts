export interface ModuleProgressEntity {
    progress_id: number;
    user_id: number;
    module_id: number;
    is_completed: 'not_started' | 'in_progress' | 'completed' | 'terminated' | 'suspended';
    last_accessed: Date;
    completed_at?: Date | null;
}
