import {FilterSet, TournamentFilter} from "@/app/filters/filters";

export const DEFAULT_PERFORMANCE_FILTER: TournamentFilter = {
    transform: (result) => result.player.performance
}
export const DEFAULT_POINTS_FILTER: TournamentFilter = {
    transform: (result) => result.player.score
}
export const DEFAULT_GAMES_PLAYED_FILTER: TournamentFilter = {
    transform: (result) => result.player.games
}
export const DEFAULT_RANK_FILTER: TournamentFilter = {
    transform: (result) => result.player.rank
}
export const DEFAULT_TOTAL_PLAYERS_FILTER: TournamentFilter = {
    transform: (result) => result.tournament.nbPlayers
}
export const DEFAULT_VARIANT_FILTER: TournamentFilter = {
    transform: (result) => result.tournament.variant.name
}

export const EMPTY_FILTER_SET: FilterSet = {
    performance: DEFAULT_PERFORMANCE_FILTER,
    points: DEFAULT_POINTS_FILTER,
    gamesPlayed: DEFAULT_GAMES_PLAYED_FILTER,
    rank: DEFAULT_RANK_FILTER,
    totalPlayers: DEFAULT_TOTAL_PLAYERS_FILTER,
    variant: DEFAULT_VARIANT_FILTER
};