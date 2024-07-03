module.exports = {
    TaskRequestDTO: class TaskRequestDTO {
        constructor(task, id){
            this.title = task.title,
            this.description = task.description,
            this.dueDate = task.dueDate,
            this.status = task.status,
            this.userID = id
        }
    },
    TaskResponseDTO: class TaskResponseDTO {
        constructor(task){
            this.id = task._id,
            this.title = task.title,
            this.description = task.description,
            this.dueDate = task.dueDate,
            this.status = task.status
        }
    },
    AdminTaskResponseDTO: class AdminTaskResponseDTO {
        constructor(task){
            this.id = task._id,
            this.title = task.title,
            this.description = task.description,
            this.dueDate = task.dueDate,
            this.status = task.status
            this.userID = task.userID
        }
    }
}