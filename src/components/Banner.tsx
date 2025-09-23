interface BannerProps {
    title: string
}

export const Banner = (props: BannerProps) => {
    return (
        <h1 className="mt-5">{props.title}</h1>
    )
}