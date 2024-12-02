interface TournamentPlayer {
    games: number;
    score: number;
    rank: number;
    performance: number;
}

interface Variant {
    key: string;
    short: string;
    name: string;
}

enum TournamentStatus {
    CREATED = 10,
    STARTED = 20,
    FINISHED = 30
}

interface RatingObj {
    perf: string;
    rating: number;
}

interface Tournament {
    id: string;
    createdBy: string;
    system: "arena";
    minutes: number;
    clock: { limit: number, increment: number };
    rated: boolean;
    fullName: string;
    nbPlayers: number;
    variant: Variant;
    startsAt: number;
    finishesAt: number;
    status: TournamentStatus;
    perf: { key: string, name: string, position: number, icon: string };
    secondsToStart: number;
    hasMaxRating: boolean;
    maxRating: RatingObj;
    minRating: RatingObj;
    onlyTitle: boolean;
    teamMember: string;
    private: boolean;
    // Skipped position key
    schedule: { freq: string, speed: string };
    teamBattle: { teams: string[], nbLeaders: number };
    winner: { id: string, name: string, title: string };
}

export interface TournamentResult {
    tournament: Tournament;
    player: TournamentPlayer;
}
