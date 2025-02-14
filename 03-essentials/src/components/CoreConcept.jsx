// alternative: use a single parameter (ex CoreConcept(props)) and access
// using props.name_of_prop
export default function CoreConcept({ image, title, description}) {
    return (
        <li>
            <img src={ image } alt={ title } />
            <h3>{ title }</h3>
            <p>{ description }</p>
        </li>
    );
}