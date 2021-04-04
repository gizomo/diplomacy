<template>
  <div class="prof-orient">
    <div class="prof-orient-intro" v-if="isInfo">
      <h1 class="prof-orient-title">Выбери свою профессию будущего</h1>
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
      <button class="start-orient" @click="startOrient">Начать</button>
    </div>
    <div class="skills" v-if="isSkill">
      <h1 class="skills-title">Надпрофессиональные навыки</h1>
      <p>
        Выбор навыков является первым шагом к будущей профессии. Владение
        навыками позволяет специалистам работать эффективнее, переходить между
        отраслями и сохранять при этом востребованность.
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
          :label="skill.name"
          :value="skill.id"
          :optionObj="skill"
        />
      </div>
      <div class="buttons">
        <button class="skills-save" @click="skillsSave">Продолжить</button>
      </div>
    </div>
    <div class="trends" v-if="isTrends">
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
        узнать какое влияние они оказывают на общество, и как они определяют
        рынок труда будущего.
      </p>
      <div class="options-list">
        <check-box
          v-for="trend in trends"
          v-model="selectedTrends"
          dataType="trends"
          :key="trend.id"
          :label="trend.name"
          :value="trend.id"
          :optionObj="trend"
        />
      </div>
      <div class="buttons">
        <button class="trends-save" @click="trendsSave">Продолжить</button>
      </div>
    </div>
    <div class="professions-list" v-if="isProfessions">
      <div
        class="profession"
        v-for="profession in aggregatedProfessions"
        :key="profession.id"
      >
        <h3 class="profession-title">{{ profession.name }}</h3>
      </div>
      <button class="professions-reset" @click="profsReset">Сбросить</button>
    </div>
  </div>
</template>
<script>
import ProfOrient from "../assets/profOrient";
import CheckBox from "./CheckBox";

export default {
  name: "ProfOrient",
  components: {
    CheckBox,
  },
  data() {
    return {
      isInfo: true,
      isSkill: false,
      isTrends: false,
      isProfessions: false,

      skills: ProfOrient.skills,
      trends: ProfOrient.trends,
      professions: ProfOrient.professions,
      eduProgramms: ProfOrient.eduProgramms,

      selectedSkills: [],
      selectedTrends: [],
    };
  },
  methods: {
    startOrient() {
      this.isInfo = false;
      this.isSkill = true;
    },
    skillsSave() {
      this.isSkill = false;
      this.isTrends = true;
    },
    trendsSave() {
      this.isTrends = false;
      this.isProfessions = true;
    },
    profsReset() {
      this.isProfessions = false;
      this.calcProfs = [];
      this.selectedSkills = [];
      this.selectedTrends = [];
      this.isSkill = true;
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
.prof-orient {
  padding: 3rem;
}
.skills {
  min-width: 20rem;
  width: 50vw;
  margin: 0 auto;
  padding: 3rem 6rem;
  background-color: #fafcff;
  border-radius: 3rem;
  box-shadow: 0px 25px 20px rgba(2, 100, 242, 0.2);
}
.options-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  /* flex-direction: column; */
  gap: 1rem;
}
</style>
