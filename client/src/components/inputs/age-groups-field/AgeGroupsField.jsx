import { useAgeGroups } from "../../../api/ageGroupsApi";

const AgeGroupsField = ({
    selectedAgeGroups,
    toggleAgeGroupSelection,
    setAllAgeGroups,
}) => {
    const { ageGroups } = useAgeGroups();

    return (
        <>
            {ageGroups.map((ageGroup) => (
                <button
                    key={ageGroup._id}
                    type="button"
                    onClick={() => toggleAgeGroupSelection(ageGroup)}
                    className={`px-4 py-2 m-2 text-sm font-semibold rounded-md ${
                        selectedAgeGroups.includes(ageGroup.name)
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-800"
                    } hover:bg-blue-600 hover:text-white cursor-pointer`}
                >
                    {ageGroup.name}
                </button>
            ))}
            <button
                type="button"
                onClick={setAllAgeGroups}
                className={`px-4 py-2 m-2 text-sm font-semibold rounded-md ${
                    selectedAgeGroups.length === ageGroups.length
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-800"
                } hover:bg-blue-600 hover:text-white cursor-pointer`}
            >
                All
            </button>
        </>
    );
};

export default AgeGroupsField;
