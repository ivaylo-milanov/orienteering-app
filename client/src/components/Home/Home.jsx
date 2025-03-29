import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import { useLatestEvents } from "../../api/eventsApi";
import HomeLatestEvent from "/home-latest-event/HomeLatestEvent";

const Home = () => {
    const { latestEvents } = useLatestEvents();

    return (
        <>
            <header className={styles.hero}>
                <div className={styles.overlay}></div>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>Embark on Your Orienteering Journey</h1>
                    <p className={styles.heroSubtitle}>
                        Explore events, connect with clubs, and navigate new terrains.
                    </p>
                    <Link to="/events" className={styles.heroLink}>
                        Find an Event
                    </Link>
                </div>
            </header>

            <section className="py-16 bg-gray-100 text-center">
                <h2 className={styles.sectionTitle}>What is Orienteering?</h2>
                <p className={styles.sectionText}>
                    Orienteering is a competitive sport that combines racing with
                    navigation. Using a map and compass, participants navigate from point
                    to point in diverse and usually unfamiliar terrain, while moving at
                    speed.
                </p>
            </section>

            <section id="events" className="py-16">
                <h2 className={styles.sectionTitle}>Upcoming Events</h2>
                <div className={styles.eventsGrid}>
                    {latestEvents.length > 0 ? (
                        latestEvents.map((event) => (
                            <HomeLatestEvent key={event._id} {...event} />
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No events found</p>
                    )}
                </div>
            </section>

            <section className="py-16">
                <h2 className={styles.sectionTitle}>What Our Community Says</h2>
                <div className={styles.testimonialsContainer}>
                    <div className={styles.testimonial}>
                        <p className={styles.testimonialText}>
                            "Orienteering has transformed the way I explore the outdoors. The
                            community is welcoming, and every event is an adventure!"
                        </p>
                        <p className={styles.testimonialName}>Jane Doe</p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
