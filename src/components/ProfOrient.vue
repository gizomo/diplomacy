<template>
  <div class="prof-orient-intro window" v-if="isInfo">
    <h1 class="prof-orient-title">Выбери свою профессию будущего</h1>
    <img
      class="prof-orient-image"
      :src="require('../../public/images/fipn.png')"
    />
    <p class="prof-orient-info">
      Приложение разработано на основе материалов
      <a href="https://new.atlas100.ru/">"Атласа новых профессий"</a>, который
      стал результатом масштабного исследовательского проекта "Форсайт
      компетенции 2030", проводимого Агенством стратегических инициатив и
      Московской школой управления СКОЛКОВО с 2010 года.
    </p>
    <p>
      Представленные в приложении профессии не стоит воспринимать как
      официальный список специальностей будущего. Цель приложения познакомить
      пользователя с многообразием профессиональных возможностей, которые
      открываются для них на программах Факультета исторических и политических
      наук.
    </p>
    <div class="buttons">
      <button class="start-orient" @click="startOrient">Начать</button>
      <button class="return" @click="$emit('backToMenu')">
        Вернуться в меню
      </button>
    </div>
  </div>
  <div class="skills window" v-if="isSkill">
    <h1 class="skills-title">Надпрофессиональные навыки</h1>
    <p>
      Выбор навыков является первым шагом к будущей профессии. Владение навыками
      позволяет специалистам работать эффективнее, переходить между отраслями и
      сохранять при этом востребованность.
    </p>
    <p>
      В приложении представлены надпрофессиональные навыки, которые показались
      работодателям наиболее важными для успеха в будущем. Изучите их
      внимательно и выберите те, что показались вам интересными и важными.
    </p>
    <div class="options-list">
      <check-box
        v-for="skill in skills"
        v-model="selectedSkills"
        dataType="skills"
        :key="skill.id"
        :value="skill.id"
        :checkBoxObject="skill"
        @openInfo="openCheckBoxInfo"
      />
    </div>
    <div class="buttons">
      <button class="skills-save" @click="skillsSave">Продолжить</button>
      <button class="skills-exit" @click="skillsExit">Закончить</button>
    </div>
  </div>
  <div class="trends window" v-if="isTrends">
    <h1 class="trends-title">Актуальные тренды</h1>
    <p>
      На рынок труда сегодня оказывает влияние множество факторов, которые
      задаются различными трендами. Старые профессии сильно видоизменяются или
      исчезают под их давлением, а новые профессии требуют от специалистов
      междисциплинарных знаний, гибкости, способности быстрой адаптации,
      самоорганизации и самообразования на проятяжении всей жизни.
    </p>
    <p>
      В приложении вы сможете познакомиться с наиболее актуальными трендами,
      узнать какое влияние они оказывают на общество, и как они определяют рынок
      труда будущего.
    </p>
    <div class="options-list">
      <check-box
        v-for="trend in trends"
        v-model="selectedTrends"
        dataType="trends"
        :key="trend.id"
        :value="trend.id"
        :checkBoxObject="trend"
        @openInfo="openCheckBoxInfo"
      />
    </div>
    <div class="buttons">
      <button class="trends-save" @click="trendsSave">Продолжить</button>
      <button class="skills-exit" @click="skillsExit">Закончить</button>
    </div>
  </div>
  <div class="professions window" v-if="isProfessions">
    <div class="professions-list">
      <div v-if="!aggregatedProfessions.length">
        <p>
          К сожалению, мы не смогил найти подходящих професий будущего под
          выбранные вами навыки и актуальные тренды. Попробуйте выбрать больше
          навыков или актуальных трендов.
        </p>
      </div>
      <div v-else>
        <p>
          Мы подобрали все возможные профессии, для которых потребуется освоение
          выбранных вами навыков и умений. Они также отвечают вашим
          предпочтениям в актуальных общественных трендах.
        </p>
        <p>
          Изучите информацию в заинтересовавших вас профессиях: какие навыки и
          умения потребуется освоить дополнительно и за какими трендами
          необходимо внимательно следить.
        </p>
        <p>
          В каждой профессии вы найдете список образовательных программ
          Факультета исторических и политических наук, обучение на которых дает
          возможность получить профессию будущего и стать восстребованым
          специалистом
        </p>
      </div>
      <div
        class="profession"
        v-for="profession in aggregatedProfessions"
        :key="profession.id"
      >
        <div class="profession-title">
          <h3>{{ profession.name }}</h3>
        </div>
        <p class="profession-description" v-if="discriptionShow">
          {{ profession.description }}
        </p>
        <div class="profession-skills">
          <!-- <p class="profession-skills-title">
              Надпрофессиональные навыки и умения
            </p> -->
          <svg-icon
            v-for="(profSkill, index) in profSkills(profession.skills)"
            :key="index"
            :svgId="'skill_' + profession.id + 'icon_' + profSkill.id"
            :size="[30, 30]"
            :viewbox="[0, 0, 26.4, 26.4]"
            :path="profSkill.d"
            :fill="'#0f46e1'"
            @tooltip="openCheckBoxInfo(profSkill)"
            v-tooltip="profSkill.name"
          />
        </div>
        <div class="profession-trends">
          <!-- <p class="profession-trends-title">Актуальные тренды</p> -->
          <svg-icon
            v-for="(profTrend, index) in profTrends(profession.trends)"
            :key="index"
            :svgId="'trend_' + profession.id + 'icon_' + profTrend.id"
            :size="[30, 30]"
            :viewbox="[0, 0, 26.4, 26.4]"
            :path="profTrend.d"
            :fill="'#fff'"
            @tooltip="openCheckBoxInfo(profTrend)"
            v-tooltip="profTrend.name"
          />
        </div>
        <div class="edu-programms">
          <span class="material-icons">school</span>
          <ul>
            <li
              v-for="(programm, index) in profProgs(profession.programms)"
              :key="index"
            >
              <a :href="programm.link" class="programm-link" target="_blank">
                {{ programm.name }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="buttons">
      <button class="professions-reset" @click="profsReset">Повторить</button>
      <button class="skills-exit" @click="skillsExit">Закончить</button>
    </div>
  </div>
  <transition name="fade">
    <modal
      v-if="isModalVisible"
      :modalContent="modalObject"
      @closeModal="closeModalWindow"
    >
      <template #header>
        <span id="titleIcon"></span>
        <h2>{{ modalObject.title }}</h2>
      </template>
      <template #content></template>
      <template #footer></template>
    </modal>
  </transition>
</template>
<script>
import ProfOrient from "../assets/profOrient";
import Modal from "./Modal";
import CheckBox from "./CheckBox";
import SvgIcon from "./SvgIcon";

export default {
  name: "ProfOrient",
  components: {
    Modal,
    CheckBox,
    SvgIcon,
  },
  emits: ["backToMenu"],
  data() {
    return {
      isModalVisible: false,
      modalObject: {
        title: String,
        body: String,
        button: String,
      },

      isInfo: true,
      isSkill: false,
      isTrends: false,
      isProfessions: false,
      discriptionShow: true,

      skills: ProfOrient.skills,
      trends: ProfOrient.trends,
      professions: ProfOrient.professions,
      eduProgramms: ProfOrient.eduProgramms,

      selectedSkills: [],
      selectedTrends: [],
    };
  },
  methods: {
    profSkills(profSkills) {
      return this.skills.filter((skill) => {
        return profSkills.includes(skill.id);
      });
    },
    profTrends(profTrends) {
      return this.trends.filter((trend) => {
        return profTrends.includes(trend.id);
      });
    },
    profProgs(profProgs) {
      return this.eduProgramms.filter((prog) => {
        return profProgs.includes(prog.id);
      });
    },
    closeModalWindow() {
      this.isModalVisible = false;
    },
    openCheckBoxInfo(checkBoxObject) {
      this.modalObject.title = checkBoxObject.name;
      this.modalObject.body = checkBoxObject.description;
      this.modalObject.button = "Закрыть";
      this.isModalVisible = true;
    },
    startOrient() {
      this.isInfo = false;
      this.isSkill = true;
    },
    skillsSave() {
      if (this.selectedSkills.length == 0) {
        this.modalObject.title = "Вы не выбрали ни одного навыка";
        this.modalObject.body = "";
        this.modalObject.button = "Закрыть";
        this.isModalVisible = true;
        // alert("Вы не выбрали ни одного навыка");
      } else {
        this.isSkill = false;
        this.isTrends = true;
      }
    },
    trendsSave() {
      if (this.selectedTrends.length == 0) {
        this.modalObject.title = "Вы не выбрали ни одного тренда";
        this.modalObject.body = "";
        this.modalObject.button = "Закрыть";
        this.isModalVisible = true;
        // alert("Вы не выбрали ни одного тренда");
      } else {
        this.isTrends = false;
        this.isProfessions = true;
      }
    },
    profsReset() {
      this.isProfessions = false;
      this.calcProfs = [];
      this.selectedSkills = [];
      this.selectedTrends = [];
      this.isSkill = true;
    },
    skillsExit() {
      this.profsReset();
      this.isTrends = false;
      this.isSkill = false;
      this.isInfo = true;
    },
  },
  computed: {
    aggregatedProfessions() {
      return this.professions.filter((profession) => {
        return (
          profession.skills.some((skill) => {
            return this.selectedSkills.includes(skill);
          }) &&
          profession.trends.some((trend) => {
            return this.selectedTrends.includes(trend);
          })
        );
      });
    },
  },
};
</script>
<style scoped>
.prof-orient-title {
  font-size: 2.5rem;
  color: #0f46e1;
  text-align: center;
}
.prof-orient-image {
  display: block;
  width: 60%;
  margin: 3rem auto;
  text-align: center;
}
.options-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  padding: 1rem 0;
}
.professions-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  gap: 2rem;
  margin-bottom: 1.5rem;
}
.profession {
  position: relative;
  width: 18rem;
  background-color: #fafcff;
  border-radius: 1.5rem;
  box-shadow: 0px 25px 20px rgba(2, 100, 242, 0.2);
}
.profession-title {
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 6rem;
  padding: 1rem;
  margin: 0;
  border-top-left-radius: 1.5rem;
  border-top-right-radius: 1.5rem;
  background-color: #34338e;
}
.profession-title h3 {
  font-size: 1.25rem;
  text-align: center;
  color: #fff;
}
.profession-description {
  box-sizing: border-box;
  overflow: hidden;
  padding: 0 1.5rem;
  font-size: 0.9rem;
}
.profession-skills,
.profession-trends {
  padding: 0.75rem 1.5rem;
  /* text-align: center; */
}
.profession-skills {
  color: #0f46e1;
  background-color: #00efd1;
}
.profession-trends {
  color: #fff;
  background-color: #0266f2;
}
.profession-skills-title,
.profession-trends-title {
  margin-top: 0;
  font-size: 0.8rem;
  text-transform: lowercase;
}
.edu-programms {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  padding: 1.5rem;
  border-bottom-left-radius: 1.5rem;
  border-bottom-right-radius: 1.5rem;
  background-color: #34338e;
}
.edu-programms span {
  color: #fff;
}
.edu-programms ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
.programm-link {
  font-size: 0.9rem;
  line-height: 1.25rem;
  color: #fff;
  text-decoration: none;
}
.programm-link:hover {
  text-decoration: underline;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
