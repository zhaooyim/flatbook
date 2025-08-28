import useChores from "../../hooks/useChores"

interface Props {
    flatId: string
    choreId: number
}

export default function RemoveChoreButton({ flatId, choreId }: Props) {
    const { delMutation } = useChores(flatId)

    const handleRemoveChoreItem = () => {
        delMutation.mutateAsync(choreId)
    }

    return (
        <button
            onClick={handleRemoveChoreItem}
            className="btn"
            data-testid={`remove-chore-item-button`}
        >
            Remove
        </button>)
}