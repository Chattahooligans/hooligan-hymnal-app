export const PrideraiserPalette = {
    black: "rgb(0, 0, 0)",
    brown: "rgb(120, 79, 23)",
    red: "rgb(237, 38, 26)",
    orange: "rgb(247, 148, 29)",
    yellow: "rgb(255, 242, 0)",
    green: "rgb(0, 166, 81)",
    blue: "rgb(46, 49, 146)",
    violet: "rgb(102, 45, 145)"
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