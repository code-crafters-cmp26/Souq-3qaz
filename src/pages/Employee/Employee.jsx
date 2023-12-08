import styles from './Employee.module.css'
import Card from '../../components/Card/Card'

function Employee() {
    return (
        <div className={styles.employee}>
            <div className={styles.header}>
                <h1>Welcome, Employee</h1>
            </div>
            <div className={styles.grid_cont}>
                <Card img="src/pages/Employee/report.svg" title="Reports" description="View reports" />
                <Card img="src/pages/Employee/add.svg" title="Add Employee" description="Add new employee" />
                <Card img="src/pages/Employee/user.svg" title="Users" description="View users" />
                <Card img="src/pages/Employee/pro.svg" title="Products" description="View products" />
            </div>
        </div>
    )
}

export default Employee