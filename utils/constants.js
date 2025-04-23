const project_member_roles = {
    OWNER : 'owner',
    MEMBER: 'member'
};

const project_status = {
    ACTIVE : 'active',
    COMPLETED: 'completed',
    ARCHIVED: 'archived'
};

const priority_of_task = {
    NO_PRIORITY : 'no_priority',
    URGENT : 'urgent',
    HIGH : 'high',
    MEDIUM : 'medium',
    LOW : 'low'
}

const status_of_task = {
    BACKLOG : 'backlog',
    TODO : 'todo',
    INPROGRESS : 'inprogress',
    INREVIEW : 'inreview',
    DONE : 'done',
    CANCELLED : 'cancelled',
    DUPLICATE : 'duplicate'
}

const types_of_task = {
    FEATURE: 'feature',
    BUG: 'bug',
    IMPROVEMENT: 'improvement',
    DOCUMENTATION: 'documentation',
    RESEARCH: 'research',
    OTHER: 'other'
};

export {project_member_roles, project_status, priority_of_task, status_of_task,types_of_task};