export const PrideraiserPalette = {
    red: "#ED1C24",
    orange: "#F7941D",
    yellow: "#FFF200",
    green: "#00A651",
    blue: "#2E3192",
    violet: "#662D91",
    brown: "#784F17",
    black: "#000000",
    paleBlue: "#55CDFC",
    white: "#FFFFFF",
    palePink: "#F7A8B8"
}

export function formatStringWithCampaignProps(input, campaign, goalCount) {
    let output = input
    let goal_name_computed = ""
    if (goalCount > 0)
        goal_name_computed = (goalCount > 1) ? campaign.goal_name_plural : campaign.goal_name
    else
        goal_name_computed = campaign.goal_name_plural

    output = output.replace("%name%", campaign.name)
    output = output.replace("%team_name%", campaign.team_name)
    output = output.replace("%charity_name%", campaign.charity_name)
    output = output.replace("%goal_name%", campaign.goal_name)
    output = output.replace("%goal_name_plural%", campaign.goal_name_plural)
    output = output.replace("%goal_name_computed%", goal_name_computed)
    output = output.replace("%goals_made%", campaign.goals_made)
    output = output.replace("%pledged_total%", campaign.pledged_total)

    output = output.replace("%supporter_group.name%", campaign.supporter_group.name)

    return output
}