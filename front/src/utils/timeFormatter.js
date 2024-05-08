function getFormatedHours(time) {
  let hours = new Date(time).getHours();
  let timeAmPm = hours >= 12 ? '오후' : '오전';
  hours = hours % 12;
  let timeFormat = hours ? hours : 12;

  return timeAmPm + ' ' + timeFormat + '시';
}

module.exports = { getFormatedHours };
