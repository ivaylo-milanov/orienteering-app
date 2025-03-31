const StagesField = ({
    stages,
    setFormData
}) => {
    const removeStage = (index) => {
        const updatedStages = stages.filter((_, i) => i !== index);
        setFormData((prev) => ({ ...prev, stages: updatedStages }));
    }

    const addStage = () =>
        setFormData((prev) => ({
            ...prev,
            stages: [...prev.stages, { name: "", date: "" }],
        }))

    const onChangeStagesHandler = (e, index) => {
        const { name, value } = e.target;
        const updatedStages = [...stages];
        updatedStages[index][name] = value;
        setFormData((prev) => ({
            ...prev,
            stages: updatedStages
        }));
    };

    return (
        <>
            {stages.map((stage, index) => (
                <div key={index} className="flex items-center space-x-4">
                    <input
                        type="text"
                        name="name"
                        value={stage.name}
                        onChange={(e) => onChangeStagesHandler(e, index)}
                        placeholder="Stage Name"
                        required
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="date"
                        name="date"
                        value={stage.date}
                        onChange={(e) => onChangeStagesHandler(e, index)}
                        required
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                    {stages.length > 1 && (
                        <button
                            type="button"
                            onClick={() => removeStage(index)}
                            className="text-red-500 hover:underline"
                        >
                            Remove
                        </button>
                    )}
                    {index === stages.length - 1 && (
                        <button
                            type="button"
                            onClick={addStage}
                            className="text-blue-500 hover:underline"
                        >
                            Add
                        </button>
                    )}
                </div>
            ))}
        </>
    );
};

export default StagesField;
