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
            <a
                href={`/details/${_id}`}
                className={styles.eventCardLink}
            >
                Details
            </a>
        </div>
    );
}

export default HomeLatestEvent;