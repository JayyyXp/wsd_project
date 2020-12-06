

const showSummaryForm = ({render}) => {

    const data = {
        week_summary: 'last week',
        month_summary: 'last month'
    }

    render('summary.ejs', data);
}

export { showSummaryForm }