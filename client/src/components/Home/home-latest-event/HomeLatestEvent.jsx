import { Link } from 'react-router';
import styles from './HomeLatestEvent.module.css';

const HomeLatestEvent = ({
    _id,
    eventDate,
    eventName
}) => {
    return (
        <div className={styles.eventCard}>
            <h3 className={styles.eventCardTitle}>
                ${eventName}
            </h3>
            <p className={styles.eventCardDate}>{eventDate}</p>
            <Link
                to={`/events/${_id}/details`}
                className={styles.eventCardLink}
            >
                Details
            </Link>
        </div>
    );
}

export default HomeLatestEvent;