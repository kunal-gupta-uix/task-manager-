const project_member_roles = {
    OWNER : 'owner',
    MEMBER: 'member'
};

const project_status = {
    ACTIVE : 'active',
    COMPLETED: 'completed',
    ARCHIVED: 'archived'
};

const task_priority = {
    NO_PRIORITY : 'no_priority',
    URGENT : 'urgent',
    HIGH : 'high',
    MEDIUM : 'medium',
    LOW : 'low'
}

const task_status = {
    BACKLOG : 'backlog',
    TODO : 'todo',
    INPROGRESS : 'inprogress',
    INREVIEW : 'inreview',
    DONE : 'done',
    CANCELLED : 'cancelled',
    DUPLICATE : 'duplicate'
}

const task_type = {
    FEATURE: 'feature',
    BUG: 'bug',
    IMPROVEMENT: 'improvement',
    DOCUMENTATION: 'documentation',
    RESEARCH: 'research',
    OTHER: 'other'
};

module.exports = {project_member_roles, project_status, task_priority, task_status, task_type};