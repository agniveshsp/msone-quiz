
export default function BlankSubtitleInput({ name, value, label, chWidth, align }) {
    const alignClass = {
        left: "text-left",
        center: "text-center",
        right: "text-right",
    };

    return (
        <input
            type="text"
            name={name}
            id=""
            defaultValue=""
            autoComplete="off"
            aria-label={label}
            style={{ width: `${chWidth}ch` }}
            className={`border-b bg-white border-black outline-none ${alignClass[align] || ""}`}
        />
    );
}