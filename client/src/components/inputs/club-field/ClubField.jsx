import { useClubs } from "../../../api/clubsApi";

const ClubField = ({ onChange, club, classes, ...attributes }) => {
    const { clubs } = useClubs();

    return (
        <select
            className={classes}
            value={club}
            onChange={onChange}
            name="clubId"
            {...attributes}
        >
            <option value="">Select Club</option>
            {clubs.map((club) => (
                <option key={club._id} value={club._id}>
                    {club.name}
                </option>
            ))}
        </select>
    );
};

export default ClubField;
