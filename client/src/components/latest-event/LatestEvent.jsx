import { Link } from 'react-router';
import styles from './LatestEvent.module.css';
import { formatDate } from '../../utils/dateFormatter';

const LatestEvent = ({
    _id,
    date,
    name
}) => {
    return (
        <div className={styles.eventCard}>
            <h3 className={styles.eventCardTitle}>
                {name}
            </h3>
            <p className={styles.eventCardDate}>{formatDate(date)}</p>
            <Link
                to={`/events/details/${_id}`}
                className={styles.eventCardLink}
            >
                Details
            </Link>
        </div>
    );
}

export default LatestEvent;