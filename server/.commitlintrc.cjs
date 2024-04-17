// Refer to `gitmoji-vscode`: https://github.com/seatonjiang/gitmoji-vscode/blob/main/src/gitmoji.ts
const gitmojis=[{emoji:'🎨',code:':art:'},{emoji:'⚡️',code:':zap:'},{emoji:'🔥',code:':fire:'},{emoji:'🐛',code:':bug:'},{emoji:'🚑',code:':ambulance:'},{emoji:'✨',code:':sparkles:'},{emoji:'📝',code:':memo:'},{emoji:'🚀',code:':rocket:'},{emoji:'💄',code:':lipstick:'},{emoji:'🎉',code:':tada:'},{emoji:'✅',code:':white_check_mark:'},{emoji:'🔒️',code:':lock:'},{emoji:'🔐',code:':closed_lock_with_key:'},{emoji:'🔖',code:':bookmark:'},{emoji:'🚨',code:':rotating_light:'},{emoji:'🚧',code:':construction:'},{emoji:'💚',code:':green_heart:'},{emoji:'⬇️',code:':arrow_down:'},{emoji:'⬆️',code:':arrow_up:'},{emoji:'📌',code:':pushpin:'},{emoji:'👷',code:':construction_worker:'},{emoji:'📈',code:':chart_with_upwards_trend:'},{emoji:'♻️',code:':recycle:'},{emoji:'➕',code:':heavy_plus_sign:'},{emoji:'➖',code:':heavy_minus_sign:'},{emoji:'🔧',code:':wrench:'},{emoji:'🔨',code:':hammer:'},{emoji:'🌐',code:':globe_with_meridians:'},{emoji:'✏️',code:':pencil2:'},{emoji:'💩',code:':poop:'},{emoji:'⏪',code:':rewind:'},{emoji:'🔀',code:':twisted_rightwards_arrows:'},{emoji:'📦',code:':package:'},{emoji:'👽️',code:':alien:'},{emoji:'🚚',code:':truck:'},{emoji:'📄',code:':page_facing_up:'},{emoji:'💥',code:':boom:'},{emoji:'🍱',code:':bento:'},{emoji:'♿️',code:':wheelchair:'},{emoji:'💡',code:':bulb:'},{emoji:'🍻',code:':beers:'},{emoji:'💬',code:':speech_balloon:'},{emoji:'🗃️',code:':card_file_box:'},{emoji:'🔊',code:':loud_sound:'},{emoji:'🔇',code:':mute:'},{emoji:'👥',code:':busts_in_silhouette:'},{emoji:'🚸',code:':children_crossing:'},{emoji:'🏗️',code:':building_construction:'},{emoji:'📱',code:':iphone:'},{emoji:'🤡',code:':clown_face:'},{emoji:'🥚',code:':egg:'},{emoji:'🙈',code:':see_no_evil:'},{emoji:'📸',code:':camera_flash:'},{emoji:'⚗️',code:':alembic:'},{emoji:'🔍',code:':mag:'},{emoji:'🏷️',code:':label:'},{emoji:'🌱',code:':seedling:'},{emoji:'🚩',code:':triangular_flag_on_post:'},{emoji:'🥅',code:':goal_net:'},{emoji:'💫',code:':dizzy:'},{emoji:'🗑️',code:':wastebasket:'},{emoji:'🛂',code:':passport_control:'},{emoji:'🩹',code:':adhesive_bandage:'},{emoji:'🧐',code:':monocle_face:'},{emoji:'⚰️',code:':coffin:'},{emoji:'🧪',code:':test_tube:'},{emoji:'👔',code:':necktie:'},{emoji:'🩺',code:':stethoscope:'},{emoji:'🧱',code:':bricks:'},{emoji:'🧑‍💻',code:':technologist:'},{emoji:'💸',code:':money_with_wings:'},{emoji:'🧵',code:':thread:'},{emoji:'🦺',code:':safety_vest:'}].map(({emoji})=>emoji);

module.exports = {
  plugins: [
    {
      rules: {
        'header-pattern': ({ header }, _when, emojis) => {
          if (!header) {
            return [false, 'Message must be non-empty'];
          } else if (!emojis.some((emoji) => header.startsWith(emoji))) {
            return [false, 'Message must start with an emoji'];
          } else return [true, ''];
        }
      }
    }
  ],
  rules: {
    'header-pattern': () => [2, 'always', gitmojis]
  }
};
