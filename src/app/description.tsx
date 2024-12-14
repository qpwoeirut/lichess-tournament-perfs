import {Link} from "@/app/components/link";

export function Description() {
    return <>
        <h1 className="text-3xl text-center">Welcome to the lichess-tournament-perfs tool!</h1>
        <p>
            This is a website which looks up a user&#39;s arena tournament performances on <a
            href="https://lichess.org" target="_blank" rel="noreferrer">Lichess</a>. It was built to help identify
            tournaments which might qualify users for variant titles (such as <Link
            href="https://lichess.org/team/horde-variant-titles">
            Horde Variant Titles
        </Link>).
        </p>
    </>
}
