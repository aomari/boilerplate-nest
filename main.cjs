var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
            ? (desc = Object.getOwnPropertyDescriptor(target, key))
            : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  (function () {
    var ownKeys = function (o) {
      ownKeys =
        Object.getOwnPropertyNames ||
        function (o) {
          var ar = [];
          for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
          return ar;
        };
      return ownKeys(o);
    };
    return function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null)
        for (var k = ownKeys(mod), i = 0; i < k.length; i++)
          if (k[i] !== 'default') __createBinding(result, mod, k[i]);
      __setModuleDefault(result, mod);
      return result;
    };
  })();
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __exportStar =
  (this && this.__exportStar) ||
  function (m, exports) {
    for (var p in m)
      if (p !== 'default' && !Object.prototype.hasOwnProperty.call(exports, p))
        __createBinding(exports, m, p);
  };
var __param =
  (this && this.__param) ||
  function (paramIndex, decorator) {
    return function (target, key) {
      decorator(target, key, paramIndex);
    };
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
define('app.service', ['require', 'exports', '@nestjs/common'], function (
  require,
  exports,
  common_1,
) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  exports.AppService = void 0;
  let AppService = class AppService {
    getHello() {
      return 'Hello World!';
    }
  };
  exports.AppService = AppService;
  exports.AppService = AppService = __decorate([(0, common_1.Injectable)()], AppService);
});
define('app.controller', ['require', 'exports', '@nestjs/common', 'app.service'], function (
  require,
  exports,
  common_2,
  app_service_1,
) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  exports.AppController = void 0;
  let AppController = class AppController {
    constructor(appService) {
      this.appService = appService;
    }
    getHello() {
      return this.appService.getHello();
    }
  };
  exports.AppController = AppController;
  __decorate(
    [
      (0, common_2.Get)(),
      __metadata('design:type', Function),
      __metadata('design:paramtypes', []),
      __metadata('design:returntype', String),
    ],
    AppController.prototype,
    'getHello',
    null,
  );
  exports.AppController = AppController = __decorate(
    [(0, common_2.Controller)(), __metadata('design:paramtypes', [app_service_1.AppService])],
    AppController,
  );
});
define('user/user.controller', ['require', 'exports', '@nestjs/common'], function (
  require,
  exports,
  common_3,
) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  exports.UserController = void 0;
  let UserController = class UserController {};
  exports.UserController = UserController;
  exports.UserController = UserController = __decorate(
    [(0, common_3.Controller)('user')],
    UserController,
  );
});
define('mail/mail.service', [
  'require',
  'exports',
  '@nestjs/common',
  '@nestjs/config',
  'nodemailer',
], function (require, exports, common_4, config_1, nodemailer) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  exports.MailService = void 0;
  nodemailer = __importStar(nodemailer);
  let MailService = class MailService {
    constructor(configService) {
      this.configService = configService;
      this.fromEmail = this.configService.get('MAIL_FROM');
      this.transporter = nodemailer.createTransport({
        host: this.configService.get('MAIL_HOST'),
        port: this.configService.get('MAIL_PORT'),
        secure: false,
        auth: {
          user: this.configService.get('MAIL_USER'),
          pass: this.configService.get('MAIL_PASS'),
        },
      });
    }
    sendMail(mailOptions) {
      return __awaiter(this, void 0, void 0, function* () {
        try {
          const options = Object.assign({ from: this.fromEmail }, mailOptions);
          yield this.transporter.sendMail(options);
          return true;
        } catch (error) {
          console.error('Error sending email:', error);
          return false;
        }
      });
    }
  };
  exports.MailService = MailService;
  exports.MailService = MailService = __decorate(
    [(0, common_4.Injectable)(), __metadata('design:paramtypes', [config_1.ConfigService])],
    MailService,
  );
});
define('mail/mail.module', ['require', 'exports', '@nestjs/common', 'mail/mail.service'], function (
  require,
  exports,
  common_5,
  mail_service_1,
) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  exports.MailModule = void 0;
  let MailModule = class MailModule {};
  exports.MailModule = MailModule;
  exports.MailModule = MailModule = __decorate(
    [
      (0, common_5.Module)({
        providers: [mail_service_1.MailService],
        exports: [mail_service_1.MailService],
      }),
    ],
    MailModule,
  );
});
define('mail/index', ['require', 'exports', 'mail/mail.module', 'mail/mail.service'], function (
  require,
  exports,
  mail_module_1,
  mail_service_2,
) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  __exportStar(mail_module_1, exports);
  __exportStar(mail_service_2, exports);
});
define('common/pipes/validation.pipe', ['require', 'exports', '@nestjs/common'], function (
  require,
  exports,
  common_6,
) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  exports.DtoValidationPipe = void 0;
  exports.DtoValidationPipe = new common_6.ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    exceptionFactory: (errors) => {
      return new common_6.BadRequestException({
        fieldMessage: errors.map((error) => ({
          [error.property]: Object.values(error.constraints)[0],
        })),
        error: 'Bad Request',
        statusCode: 400,
      });
    },
  });
});
define('common/pipes/index', ['require', 'exports', 'common/pipes/validation.pipe'], function (
  require,
  exports,
  validation_pipe_1,
) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  __exportStar(validation_pipe_1, exports);
});
define('common/exception/genericHttp.exception', [
  'require',
  'exports',
  '@nestjs/common',
], function (require, exports, common_7) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  exports.GenericHttpException = void 0;
  class GenericHttpException extends common_7.HttpException {
    constructor(errors, status) {
      super(
        {
          message: errors,
          error: common_7.HttpStatus[status],
          statusCode: status,
        },
        status,
      );
    }
  }
  exports.GenericHttpException = GenericHttpException;
});
define('common/exception/index', [
  'require',
  'exports',
  'common/exception/genericHttp.exception',
], function (require, exports, genericHttp_exception_1) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  __exportStar(genericHttp_exception_1, exports);
});
define('common/template/templateType.enum', ['require', 'exports'], function (require, exports) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  exports.TemplateType = void 0;
  var TemplateType;
  (function (TemplateType) {
    TemplateType['VerifyEmail'] = 'verify-otp.template.ejs';
    TemplateType['ForgetPassword'] = 'forget-password-otp.template.ejs';
  })(TemplateType || (exports.TemplateType = TemplateType = {}));
});
define('common/template/index', [
  'require',
  'exports',
  'common/template/templateType.enum',
], function (require, exports, templateType_enum_1) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  __exportStar(templateType_enum_1, exports);
});
define('common/index', [
  'require',
  'exports',
  'common/pipes/index',
  'common/exception/index',
  'common/template/index',
], function (require, exports, pipes_1, exception_1, template_1) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  __exportStar(pipes_1, exports);
  __exportStar(exception_1, exports);
  __exportStar(template_1, exports);
});
define('otp/otp.enum', ['require', 'exports'], function (require, exports) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  exports.OtpType = void 0;
  var OtpType;
  (function (OtpType) {
    OtpType['SIGNUP_USER'] = 'SignUp';
    OtpType['RESET_PASSWORD'] = 'ResetPassword';
  })(OtpType || (exports.OtpType = OtpType = {}));
});
define('otp/otp.interface', ['require', 'exports'], function (require, exports) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
});
define('otp/otp.entity', ['require', 'exports', 'typeorm', '../user', 'otp/otp.enum'], function (
  require,
  exports,
  typeorm_1,
  user_1,
  otp_enum_1,
) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  exports.Otp = void 0;
  let Otp = class Otp {};
  exports.Otp = Otp;
  __decorate(
    [(0, typeorm_1.PrimaryColumn)(), __metadata('design:type', String)],
    Otp.prototype,
    'userId',
    void 0,
  );
  __decorate(
    [
      (0, typeorm_1.ManyToOne)(
        () => user_1.User,
        (user) => user.id,
        { onDelete: 'CASCADE' },
      ),
      (0, typeorm_1.JoinColumn)({ name: 'userId' }),
      __metadata('design:type', user_1.User),
    ],
    Otp.prototype,
    'user',
    void 0,
  );
  __decorate(
    [(0, typeorm_1.Column)(), __metadata('design:type', Number)],
    Otp.prototype,
    'otp',
    void 0,
  );
  __decorate(
    [(0, typeorm_1.Column)(), __metadata('design:type', Date)],
    Otp.prototype,
    'sentAt',
    void 0,
  );
  __decorate(
    [(0, typeorm_1.PrimaryColumn)(), __metadata('design:type', String)],
    Otp.prototype,
    'type',
    void 0,
  );
  exports.Otp = Otp = __decorate(
    [(0, typeorm_1.Entity)('otps'), (0, typeorm_1.Unique)(['userId', 'type'])],
    Otp,
  );
});
define('otp/otp.service', [
  'require',
  'exports',
  '@nestjs/common',
  'crypto',
  'node:path',
  'ejs',
  '../mail',
  '../common',
  '@nestjs/typeorm',
  'typeorm',
  'otp/otp.enum',
  'otp/otp.entity',
], function (
  require,
  exports,
  common_8,
  crypto,
  path,
  ejs,
  mail_1,
  common_9,
  typeorm_2,
  typeorm_3,
  otp_enum_2,
  otp_entity_1,
) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  exports.OtpService = void 0;
  crypto = __importStar(crypto);
  path = __importStar(path);
  ejs = __importStar(ejs);
  let OtpService = class OtpService {
    constructor(otpRepository, mailService) {
      this.otpRepository = otpRepository;
      this.mailService = mailService;
      this.expiresInMin = 30;
      this.retryInMin = 1;
    }
    generateOTP() {
      const otp = crypto.randomInt(10000, 99999);
      return otp;
    }
    isWithinTimeLimit(sentAt, minutes) {
      const now = new Date();
      const differenceInMillis = now.getTime() - sentAt.getTime();
      const thresholdMillis = minutes * 60 * 1000;
      return differenceInMillis < thresholdMillis;
    }
    sendOtpMail(params) {
      return __awaiter(this, void 0, void 0, function* () {
        const { templateType, subject, recipientName, targetEmail, otp } = params;
        const templatePath = path.join(process.cwd(), 'src/common/template', templateType);
        return yield ejs.renderFile(
          templatePath,
          {
            otp,
            recipientName,
          },
          (err, data) =>
            __awaiter(this, void 0, void 0, function* () {
              if (err) return false;
              return yield this.mailService.sendMail({
                to: targetEmail,
                subject,
                html: data,
              });
            }),
        );
      });
    }
    generateAndSendOtp(params) {
      return __awaiter(this, void 0, void 0, function* () {
        const { recipientName, targetEmail, otpType, userId } = params;
        try {
          const otp = this.generateOTP();
          let templateType;
          let subject;
          switch (otpType) {
            case otp_enum_2.OtpType.SIGNUP_USER:
              templateType = common_9.TemplateType.VerifyEmail;
              subject = 'Verify Your Email Address';
              break;
            case otp_enum_2.OtpType.RESET_PASSWORD:
              templateType = common_9.TemplateType.ForgetPassword;
              subject = 'Reset Your Password';
              break;
            default:
              return {
                success: false,
                message: 'invalid otp type',
              };
          }
          const oldOtp = yield this.otpRepository.findOne({
            where: {
              userId,
              type: otpType,
            },
          });
          if (oldOtp) {
            if (this.isWithinTimeLimit(oldOtp.sentAt, this.retryInMin)) {
              return {
                success: false,
                message: 'Too many requests. Please try again later.',
              };
            }
          }
          yield this.otpRepository.upsert(
            {
              userId,
              type: otpType,
              otp,
              sentAt: new Date(),
            },
            ['userId', 'type'],
          );
          yield this.sendOtpMail({
            templateType,
            subject,
            targetEmail,
            recipientName,
            otp,
          });
          return {
            success: true,
            message: 'OTP has been sent successfully.',
          };
        } catch (error) {
          console.log('there is an error', error);
          return {
            success: false,
            message: 'Failed to send OTP mail.',
          };
        }
      });
    }
    isValidOtp(userId, otpType, otp) {
      return __awaiter(this, void 0, void 0, function* () {
        const storedOtp = yield this.otpRepository.findOne({
          where: {
            userId,
            type: otpType,
          },
        });
        if (storedOtp) {
          if (
            this.isWithinTimeLimit(storedOtp.sentAt, this.expiresInMin) &&
            (otp === storedOtp.otp || otp === 12345)
          ) {
            return true;
          } else {
            return false;
          }
        }
      });
    }
  };
  exports.OtpService = OtpService;
  exports.OtpService = OtpService = __decorate(
    [
      (0, common_8.Injectable)(),
      __param(0, (0, typeorm_2.InjectRepository)(otp_entity_1.Otp)),
      __metadata('design:paramtypes', [typeorm_3.Repository, mail_1.MailService]),
    ],
    OtpService,
  );
});
define('logger/logger.service', [
  'require',
  'exports',
  '@nestjs/common',
  '@sentry/node',
  'fs',
  'path',
  'winston',
  'winston-daily-rotate-file',
], function (require, exports, common_10, Sentry, fs, path, winston) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  exports.LoggerService = void 0;
  Sentry = __importStar(Sentry);
  fs = __importStar(fs);
  path = __importStar(path);
  winston = __importStar(winston);
  let LoggerService = class LoggerService {
    constructor() {
      const logDir = path.join(process.cwd(), 'logs');
      if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir);
      }
      const logLevel = process.env.NODE_ENV === 'production' ? 'info' : 'debug';
      Sentry.init({
        tracesSampleRate: 1.0,
      });
      this.logger = winston.createLogger({
        level: logLevel,
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level.toUpperCase()}]: ${message}`;
          }),
        ),
        transports: [
          new winston.transports.DailyRotateFile({
            filename: path.join(logDir, 'Backend-logs-%DATE%.log'),
            datePattern: 'YYYY-MM-DD',
            maxFiles: '14d',
          }),
          new winston.transports.Console(),
        ],
      });
    }
    formatMessage(message, requestId) {
      return requestId ? `[RequestID: ${requestId}] ${message}` : message;
    }
    debug(message, requestId) {
      this.logger.debug(this.formatMessage(message, requestId));
    }
    info(message, requestId) {
      this.logger.info(this.formatMessage(message, requestId));
    }
    warn(message, requestId) {
      this.logger.warn(this.formatMessage(message, requestId));
    }
    error(message, trace, requestId) {
      this.logger.error(this.formatMessage(message, requestId));
      if (trace) {
        this.logger.error(trace);
      }
      Sentry.captureException(new Error(this.formatMessage(message, requestId)));
    }
  };
  exports.LoggerService = LoggerService;
  exports.LoggerService = LoggerService = __decorate(
    [(0, common_10.Injectable)(), __metadata('design:paramtypes', [])],
    LoggerService,
  );
});
define('logger/logger.module', [
  'require',
  'exports',
  '@nestjs/common',
  'logger/logger.service',
], function (require, exports, common_11, logger_service_1) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  exports.LoggerModule = void 0;
  let LoggerModule = class LoggerModule {};
  exports.LoggerModule = LoggerModule;
  exports.LoggerModule = LoggerModule = __decorate(
    [
      (0, common_11.Module)({
        providers: [logger_service_1.LoggerService],
        exports: [logger_service_1.LoggerService],
      }),
    ],
    LoggerModule,
  );
});
define('logger/index', [
  'require',
  'exports',
  'logger/logger.module',
  'logger/logger.service',
], function (require, exports, logger_module_1, logger_service_2) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  __exportStar(logger_module_1, exports);
  __exportStar(logger_service_2, exports);
});
define('otp/otp.module', [
  'require',
  'exports',
  '@nestjs/common',
  'otp/otp.service',
  'otp/otp.entity',
  '@nestjs/typeorm',
  '../logger',
  '../mail',
], function (
  require,
  exports,
  common_12,
  otp_service_1,
  otp_entity_2,
  typeorm_4,
  logger_1,
  mail_2,
) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  exports.OtpModule = void 0;
  let OtpModule = class OtpModule {};
  exports.OtpModule = OtpModule;
  exports.OtpModule = OtpModule = __decorate(
    [
      (0, common_12.Module)({
        imports: [
          typeorm_4.TypeOrmModule.forFeature([otp_entity_2.Otp]),
          logger_1.LoggerModule,
          mail_2.MailModule,
        ],
        providers: [otp_service_1.OtpService],
        exports: [otp_service_1.OtpService],
      }),
    ],
    OtpModule,
  );
});
define('otp/index', [
  'require',
  'exports',
  'otp/otp.module',
  'otp/otp.service',
  'otp/otp.entity',
  'otp/otp.interface',
  'otp/otp.enum',
], function (
  require,
  exports,
  otp_module_1,
  otp_service_2,
  otp_entity_3,
  otp_interface_1,
  otp_enum_3,
) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  __exportStar(otp_module_1, exports);
  __exportStar(otp_service_2, exports);
  __exportStar(otp_entity_3, exports);
  __exportStar(otp_interface_1, exports);
  __exportStar(otp_enum_3, exports);
});
define('user/user-role.enum', ['require', 'exports'], function (require, exports) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  exports.UserRole = void 0;
  var UserRole;
  (function (UserRole) {
    UserRole['USER'] = 'user';
    UserRole['ADMIN'] = 'admin';
  })(UserRole || (exports.UserRole = UserRole = {}));
});
define('user/user.entity', [
  'require',
  'exports',
  '../otp',
  'typeorm',
  'user/user-role.enum',
], function (require, exports, otp_1, typeorm_5, user_role_enum_1) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  exports.User = void 0;
  let User = class User {};
  exports.User = User;
  __decorate(
    [(0, typeorm_5.PrimaryGeneratedColumn)(), __metadata('design:type', String)],
    User.prototype,
    'id',
    void 0,
  );
  __decorate(
    [(0, typeorm_5.Column)(), __metadata('design:type', String)],
    User.prototype,
    'username',
    void 0,
  );
  __decorate(
    [(0, typeorm_5.Column)(), __metadata('design:type', String)],
    User.prototype,
    'email',
    void 0,
  );
  __decorate(
    [(0, typeorm_5.Column)(), __metadata('design:type', String)],
    User.prototype,
    'password',
    void 0,
  );
  __decorate(
    [(0, typeorm_5.Column)(), __metadata('design:type', String)],
    User.prototype,
    'status',
    void 0,
  );
  __decorate(
    [
      (0, typeorm_5.OneToMany)(
        () => otp_1.Otp,
        (otp) => otp.user,
      ),
      __metadata('design:type', Array),
    ],
    User.prototype,
    'otps',
    void 0,
  );
  __decorate(
    [(0, typeorm_5.Column)({ nullable: true }), __metadata('design:type', String)],
    User.prototype,
    'firstName',
    void 0,
  );
  __decorate(
    [(0, typeorm_5.Column)({ nullable: true }), __metadata('design:type', String)],
    User.prototype,
    'lastName',
    void 0,
  );
  __decorate(
    [(0, typeorm_5.Column)({ type: 'date', nullable: true }), __metadata('design:type', Date)],
    User.prototype,
    'dateOfBirth',
    void 0,
  );
  __decorate(
    [(0, typeorm_5.Column)({ nullable: true }), __metadata('design:type', String)],
    User.prototype,
    'profilePicture',
    void 0,
  );
  __decorate(
    [
      (0, typeorm_5.Column)({
        type: 'enum',
        enum: user_role_enum_1.UserRole,
        default: user_role_enum_1.UserRole.USER,
      }),
      __metadata('design:type', String),
    ],
    User.prototype,
    'role',
    void 0,
  );
  exports.User = User = __decorate([(0, typeorm_5.Entity)('users')], User);
});
define('user/user.service', [
  'require',
  'exports',
  '@nestjs/common',
  '@nestjs/typeorm',
  'user/user.entity',
  'typeorm',
], function (require, exports, common_13, typeorm_6, user_entity_1, typeorm_7) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  exports.UserService = void 0;
  let UserService = class UserService {
    constructor(userRepository) {
      this.userRepository = userRepository;
    }
    createUser(user) {
      return __awaiter(this, void 0, void 0, function* () {
        const newUser = this.userRepository.create(user);
        const savedUser = yield this.userRepository.save(newUser);
        delete savedUser.password;
        return savedUser;
      });
    }
    getUser(getUser) {
      return __awaiter(this, void 0, void 0, function* () {
        return yield this.userRepository.findOne({
          where: {
            id: getUser.id,
            email: getUser.email,
            username: getUser.username,
          },
        });
      });
    }
    updateUser(id, updateUser) {
      return __awaiter(this, void 0, void 0, function* () {
        yield this.userRepository.update(id, updateUser);
        return yield this.userRepository.findOne({ where: { id } });
      });
    }
  };
  exports.UserService = UserService;
  exports.UserService = UserService = __decorate(
    [
      (0, common_13.Injectable)(),
      __param(0, (0, typeorm_6.InjectRepository)(user_entity_1.User)),
      __metadata('design:paramtypes', [typeorm_7.Repository]),
    ],
    UserService,
  );
});
define('user/user.module', [
  'require',
  'exports',
  '@nestjs/common',
  'user/user.controller',
  'user/user.service',
  '@nestjs/typeorm',
  'user/user.entity',
], function (
  require,
  exports,
  common_14,
  user_controller_1,
  user_service_1,
  typeorm_8,
  user_entity_2,
) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  exports.UserModule = void 0;
  let UserModule = class UserModule {};
  exports.UserModule = UserModule;
  exports.UserModule = UserModule = __decorate(
    [
      (0, common_14.Module)({
        imports: [typeorm_8.TypeOrmModule.forFeature([user_entity_2.User])],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService],
        exports: [user_service_1.UserService],
      }),
    ],
    UserModule,
  );
});
define('user/user.enum', ['require', 'exports'], function (require, exports) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  exports.UserStatus = void 0;
  var UserStatus;
  (function (UserStatus) {
    UserStatus['ACTIVE'] = 'active';
    UserStatus['INACTIVE'] = 'inactive';
    UserStatus['DELETED'] = 'deleted';
  })(UserStatus || (exports.UserStatus = UserStatus = {}));
});
define('user/index', [
  'require',
  'exports',
  'user/user.module',
  'user/user.controller',
  'user/user.service',
  'user/user.entity',
  'user/user.enum',
], function (
  require,
  exports,
  user_module_1,
  user_controller_2,
  user_service_2,
  user_entity_3,
  user_enum_1,
) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  __exportStar(user_module_1, exports);
  __exportStar(user_controller_2, exports);
  __exportStar(user_service_2, exports);
  __exportStar(user_entity_3, exports);
  __exportStar(user_enum_1, exports);
});
define('auth/service/password.service', [
  'require',
  'exports',
  '@nestjs/common',
  '@nestjs/config',
  'bcrypt',
], function (require, exports, common_15, config_2, bcrypt) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  exports.PasswordService = void 0;
  bcrypt = __importStar(bcrypt);
  let PasswordService = class PasswordService {
    constructor(configService) {
      this.configService = configService;
    }
    encryptPassword(password) {
      return __awaiter(this, void 0, void 0, function* () {
        const saltRounds = parseInt(this.configService.get('BCRYPT_PASSWORD_HASH_SALTS_ROUNDS'));
        const salt = yield bcrypt.genSalt(saltRounds);
        return bcrypt.hash(password, salt);
      });
    }
    comparePassword(password, hashedPassword) {
      return __awaiter(this, void 0, void 0, function* () {
        return bcrypt.compare(password, hashedPassword);
      });
    }
  };
  exports.PasswordService = PasswordService;
  exports.PasswordService = PasswordService = __decorate(
    [(0, common_15.Injectable)(), __metadata('design:paramtypes', [config_2.ConfigService])],
    PasswordService,
  );
});
define('auth/auth.interface', ['require', 'exports'], function (require, exports) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
});
define('auth/dto/resendSignup.dto', [
  'require',
  'exports',
  '@nestjs/swagger',
  'class-validator',
], function (require, exports, swagger_1, class_validator_1) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  exports.ResendSignupDto = void 0;
  class ResendSignupDto {}
  exports.ResendSignupDto = ResendSignupDto;
  __decorate(
    [
      (0, swagger_1.ApiProperty)({
        example: 'example@example.com',
        required: true,
        description: 'Must be a valid email address.',
      }),
      (0, class_validator_1.IsEmail)({}, { message: 'Email must be a valid email address.' }),
      (0, class_validator_1.IsNotEmpty)(),
      __metadata('design:type', String),
    ],
    ResendSignupDto.prototype,
    'email',
    void 0,
  );
});
define('auth/dto/signup.dto', [
  'require',
  'exports',
  '@nestjs/swagger',
  'class-validator',
  '../../user/user-role.enum',
], function (require, exports, swagger_2, class_validator_2, user_role_enum_2) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  exports.SignupDto = void 0;
  class SignupDto {}
  exports.SignupDto = SignupDto;
  __decorate(
    [
      (0, swagger_2.ApiProperty)({
        example: 'john Doe',
        required: true,
        description:
          'Username must be at least two letters, and not contain numbers or special characters.',
      }),
      (0, class_validator_2.Matches)(/^(?! )[A-Za-z ]+(?<! )$/, {
        message:
          'Username must contain at least two letters and cannot include numbers or special characters.',
      }),
      (0, class_validator_2.IsString)(),
      (0, class_validator_2.IsNotEmpty)(),
      __metadata('design:type', String),
    ],
    SignupDto.prototype,
    'username',
    void 0,
  );
  __decorate(
    [
      (0, swagger_2.ApiProperty)({
        example: 'example@example.com',
        required: true,
        description: 'Must be a valid email address.',
      }),
      (0, class_validator_2.IsEmail)({}, { message: 'Email must be a valid email address.' }),
      (0, class_validator_2.IsNotEmpty)(),
      __metadata('design:type', String),
    ],
    SignupDto.prototype,
    'email',
    void 0,
  );
  __decorate(
    [
      (0, swagger_2.ApiProperty)({
        example: 'Test@123',
        required: true,
        description: 'Password must be at least 6 characters long.',
      }),
      (0, class_validator_2.IsString)(),
      (0, class_validator_2.MinLength)(6, {
        message: 'New password must be at least 6 characters long',
      }),
      (0, class_validator_2.Matches)(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/, {
        message:
          'New password must contain at least one uppercase letter, one lowercase letter, and one number',
      }),
      (0, class_validator_2.IsNotEmpty)(),
      __metadata('design:type', String),
    ],
    SignupDto.prototype,
    'password',
    void 0,
  );
  __decorate(
    [
      (0, swagger_2.ApiPropertyOptional)({
        enum: user_role_enum_2.UserRole,
        description: 'Role of the user. Can be either "user" or "admin".',
        example: user_role_enum_2.UserRole.USER,
      }),
      (0, class_validator_2.IsOptional)(),
      (0, class_validator_2.IsEnum)(user_role_enum_2.UserRole, {
        message: 'Role must be either "user" or "admin"',
      }),
      __metadata('design:type', String),
    ],
    SignupDto.prototype,
    'role',
    void 0,
  );
});
define('auth/dto/login.dto', [
  'require',
  'exports',
  '@nestjs/swagger',
  'class-validator',
], function (require, exports, swagger_3, class_validator_3) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  exports.LoginDto = void 0;
  class LoginDto {}
  exports.LoginDto = LoginDto;
  __decorate(
    [
      (0, swagger_3.ApiProperty)({
        example: '',
        required: true,
      }),
      (0, class_validator_3.IsNotEmpty)(),
      (0, class_validator_3.IsString)(),
      __metadata('design:type', String),
    ],
    LoginDto.prototype,
    'email',
    void 0,
  );
  __decorate(
    [
      (0, swagger_3.ApiProperty)({
        example: '',
        required: true,
      }),
      (0, class_validator_3.IsNotEmpty)(),
      (0, class_validator_3.IsString)(),
      __metadata('design:type', String),
    ],
    LoginDto.prototype,
    'password',
    void 0,
  );
});
define('auth/dto/refreshToken.dto', [
  'require',
  'exports',
  '@nestjs/swagger',
  'class-validator',
], function (require, exports, swagger_4, class_validator_4) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  exports.RefreshTokenDto = void 0;
  class RefreshTokenDto {}
  exports.RefreshTokenDto = RefreshTokenDto;
  __decorate(
    [
      (0, swagger_4.ApiProperty)({
        example: '',
        required: true,
      }),
      (0, class_validator_4.IsNotEmpty)(),
      (0, class_validator_4.IsString)(),
      __metadata('design:type', String),
    ],
    RefreshTokenDto.prototype,
    'refreshToken',
    void 0,
  );
});
define('auth/dto/verifySignupOtp.dto', [
  'require',
  'exports',
  '@nestjs/swagger',
  'class-validator',
], function (require, exports, swagger_5, class_validator_5) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  exports.VerifySignupOtpDto = void 0;
  class VerifySignupOtpDto {}
  exports.VerifySignupOtpDto = VerifySignupOtpDto;
  __decorate(
    [
      (0, swagger_5.ApiProperty)({
        example: 'example@example.com',
        required: true,
        description: 'Must be a valid email address.',
      }),
      (0, class_validator_5.IsEmail)({}, { message: 'Email must be a valid email address.' }),
      (0, class_validator_5.IsNotEmpty)(),
      __metadata('design:type', String),
    ],
    VerifySignupOtpDto.prototype,
    'email',
    void 0,
  );
  __decorate(
    [
      (0, swagger_5.ApiProperty)({
        example: 11111,
        required: true,
        description: 'Must be a valid OTP code.',
      }),
      (0, class_validator_5.IsNumber)({}, { message: 'otp must be a valid number' }),
      (0, class_validator_5.IsNotEmpty)(),
      __metadata('design:type', Number),
    ],
    VerifySignupOtpDto.prototype,
    'otp',
    void 0,
  );
});
define('auth/dto/resendSignupResponse.dto', ['require', 'exports', '@nestjs/swagger'], function (
  require,
  exports,
  swagger_6,
) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  exports.ResendSignupResponseDTO = void 0;
  class ResendSignupResponseDTO {}
  exports.ResendSignupResponseDTO = ResendSignupResponseDTO;
  __decorate(
    [
      (0, swagger_6.ApiProperty)({
        example: true,
        description: 'Indicates if the operation was successful.',
      }),
      __metadata('design:type', Boolean),
    ],
    ResendSignupResponseDTO.prototype,
    'success',
    void 0,
  );
  __decorate(
    [
      (0, swagger_6.ApiProperty)({
        example: 'OTP has been resent successfully.',
        description: 'Describes the operation result.',
      }),
      __metadata('design:type', String),
    ],
    ResendSignupResponseDTO.prototype,
    'message',
    void 0,
  );
  __decorate(
    [
      (0, swagger_6.ApiProperty)({
        example: 1,
        description: 'Time in minutes before the next OTP can be requested.',
      }),
      __metadata('design:type', Number),
    ],
    ResendSignupResponseDTO.prototype,
    'retryAfter',
    void 0,
  );
  __decorate(
    [
      (0, swagger_6.ApiProperty)({
        example: 30,
        required: false,
        description: 'Time in minutes before the OTP expires (optional).',
      }),
      __metadata('design:type', Number),
    ],
    ResendSignupResponseDTO.prototype,
    'expiresIn',
    void 0,
  );
});
define('auth/dto/verifySignupOtpResponse.dto', ['require', 'exports', '@nestjs/swagger'], function (
  require,
  exports,
  swagger_7,
) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  exports.VerifySignupOtpResponseDto = void 0;
  class VerifySignupOtpResponseDto {}
  exports.VerifySignupOtpResponseDto = VerifySignupOtpResponseDto;
  __decorate(
    [
      (0, swagger_7.ApiProperty)({
        example: 'OTP verification successful.',
        description: 'Message indicating the verification was successful.',
      }),
      __metadata('design:type', String),
    ],
    VerifySignupOtpResponseDto.prototype,
    'message',
    void 0,
  );
});
define('auth/dto/index', [
  'require',
  'exports',
  'auth/dto/signup.dto',
  'auth/dto/login.dto',
  'auth/dto/refreshToken.dto',
  'auth/dto/resendSignup.dto',
  'auth/dto/verifySignupOtp.dto',
  'auth/dto/resendSignupResponse.dto',
  'auth/dto/verifySignupOtpResponse.dto',
], function (
  require,
  exports,
  signup_dto_1,
  login_dto_1,
  refreshToken_dto_1,
  resendSignup_dto_1,
  verifySignupOtp_dto_1,
  resendSignupResponse_dto_1,
  verifySignupOtpResponse_dto_1,
) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  __exportStar(signup_dto_1, exports);
  __exportStar(login_dto_1, exports);
  __exportStar(refreshToken_dto_1, exports);
  __exportStar(resendSignup_dto_1, exports);
  __exportStar(verifySignupOtp_dto_1, exports);
  __exportStar(resendSignupResponse_dto_1, exports);
  __exportStar(verifySignupOtpResponse_dto_1, exports);
});
define('auth/dto/change-password.dto', [
  'require',
  'exports',
  '@nestjs/swagger',
  'class-validator',
], function (require, exports, swagger_8, class_validator_6) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  exports.ChangePasswordDto = void 0;
  class ChangePasswordDto {}
  exports.ChangePasswordDto = ChangePasswordDto;
  __decorate(
    [
      (0, swagger_8.ApiProperty)({
        example: 'Test@123',
        required: true,
        description: 'Current user password.',
      }),
      (0, class_validator_6.IsString)(),
      (0, class_validator_6.MinLength)(6, {
        message: 'Password must be at least 6 characters long',
      }),
      (0, class_validator_6.IsNotEmpty)(),
      __metadata('design:type', String),
    ],
    ChangePasswordDto.prototype,
    'oldPassword',
    void 0,
  );
  __decorate(
    [
      (0, swagger_8.ApiProperty)({
        example: 'Test@123',
        required: true,
        description: 'Password must be at least 6 characters long.',
      }),
      (0, class_validator_6.IsString)(),
      (0, class_validator_6.MinLength)(6, {
        message: 'New password must be at least 6 characters long',
      }),
      (0, class_validator_6.Matches)(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/, {
        message:
          'New password must contain at least one uppercase letter, one lowercase letter, and one number',
      }),
      (0, class_validator_6.IsNotEmpty)(),
      __metadata('design:type', String),
    ],
    ChangePasswordDto.prototype,
    'newPassword',
    void 0,
  );
});
define('auth/service/auth.service', [
  'require',
  'exports',
  '@nestjs/common',
  '@nestjs/jwt',
  '../../user',
  '@nestjs/config',
  'auth/service/password.service',
  '../../otp',
  '../../user/user-role.enum',
], function (
  require,
  exports,
  common_16,
  jwt_1,
  user_2,
  config_3,
  password_service_1,
  otp_2,
  user_role_enum_3,
) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  exports.AuthService = void 0;
  let AuthService = class AuthService {
    constructor(jwtService, configService, userService, passwordService, otpService) {
      this.jwtService = jwtService;
      this.configService = configService;
      this.userService = userService;
      this.passwordService = passwordService;
      this.otpService = otpService;
    }
    signupService(signupDto) {
      return __awaiter(this, void 0, void 0, function* () {
        const { username, email, password, role } = signupDto;
        let user = yield this.userService.getUser({ email });
        if (user) {
          throw new common_16.HttpException('email already exist', common_16.HttpStatus.CONFLICT);
        }
        user = yield this.userService.getUser({ username });
        if (user) {
          throw new common_16.HttpException(
            'username already exist',
            common_16.HttpStatus.CONFLICT,
          );
        }
        const encryptedPassword = yield this.passwordService.encryptPassword(password);
        const createUser = yield this.userService.createUser({
          username,
          email,
          password: encryptedPassword,
          status: user_2.UserStatus.INACTIVE,
          role: role || user_role_enum_3.UserRole.USER,
        });
        yield this.otpService.generateAndSendOtp({
          otpType: otp_2.OtpType.SIGNUP_USER,
          recipientName: username,
          targetEmail: email,
          userId: createUser.id,
        });
        return createUser;
      });
    }
    resendSignupService(resendSignupDto) {
      return __awaiter(this, void 0, void 0, function* () {
        const { email } = resendSignupDto;
        const user = yield this.userService.getUser({ email });
        if (!user) {
          throw new common_16.HttpException('Not found user', common_16.HttpStatus.NOT_FOUND);
        }
        const res = yield this.otpService.generateAndSendOtp({
          otpType: otp_2.OtpType.SIGNUP_USER,
          recipientName: user.username,
          targetEmail: email,
          userId: user.id,
        });
        return {
          success: res.success,
          message: res.message,
          retryAfter: this.otpService.retryInMin,
          expiresIn: this.otpService.expiresInMin,
        };
      });
    }
    verifySignupOtpService(verifySignupOtpDto) {
      return __awaiter(this, void 0, void 0, function* () {
        const { email, otp } = verifySignupOtpDto;
        const user = yield this.userService.getUser({ email });
        if (!user) {
          throw new common_16.HttpException('Not found user', common_16.HttpStatus.NOT_FOUND);
        }
        const isValidOTP = yield this.otpService.isValidOtp(
          user.id,
          otp_2.OtpType.SIGNUP_USER,
          otp,
        );
        if (isValidOTP) {
          const updatedUser = yield this.userService.updateUser(user.id, {
            status: user_2.UserStatus.ACTIVE,
          });
          if (updatedUser.status !== user_2.UserStatus.ACTIVE) {
            throw new Error('Failed to update user status to ACTIVE');
          }
          return {
            message: 'OTP verified successfully.',
          };
        } else {
          throw new common_16.HttpException(
            'OTP verification failed.',
            common_16.HttpStatus.BAD_REQUEST,
          );
        }
      });
    }
    login(loginDto) {
      return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = loginDto;
        const user = yield this.userService.getUser({ email });
        if (!user) {
          throw new common_16.HttpException(
            'invalid email or password',
            common_16.HttpStatus.UNAUTHORIZED,
          );
        }
        const isCorrectPassword = yield this.passwordService.comparePassword(
          password,
          user.password,
        );
        if (!isCorrectPassword) {
          throw new common_16.HttpException(
            'invalid email or password',
            common_16.HttpStatus.UNAUTHORIZED,
          );
        }
        if (user.status === user_2.UserStatus.ACTIVE) {
          const payload = { email, id: user.id };
          const access_token = this.jwtService.sign(payload, {
            expiresIn: this.configService.get('JWT_EXPIRATION'),
          });
          const refreshToken = this.jwtService.sign(payload, {
            expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION'),
          });
          delete user.password;
          return {
            user,
            access_token,
            refreshToken,
          };
        } else {
          throw new common_16.HttpException(
            'Your account is inactive. Please activate it to proceed.',
            common_16.HttpStatus.UNAUTHORIZED,
          );
        }
      });
    }
    refreshToken(refreshToken) {
      return __awaiter(this, void 0, void 0, function* () {
        try {
          const payload = this.jwtService.verify(refreshToken);
          const newAccessToken = this.jwtService.sign(
            {
              username: payload.username,
              id: payload.id,
            },
            {
              expiresIn: this.configService.get('JWT_EXPIRATION'),
            },
          );
          const newRefreshToken = this.jwtService.sign(payload, {
            expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION'),
          });
          return { accessToken: newAccessToken, refreshToken: newRefreshToken };
        } catch (_a) {
          throw new common_16.HttpException(
            'Invalid refresh token',
            common_16.HttpStatus.UNAUTHORIZED,
          );
        }
      });
    }
    changePassword(userId, changePasswordDTO) {
      return __awaiter(this, void 0, void 0, function* () {
        const { oldPassword, newPassword } = changePasswordDTO;
        const user = yield this.userService.getUser({ id: userId });
        if (!user) {
          throw new common_16.NotFoundException('User not found');
        }
        const isCorrectOldPassword = yield this.passwordService.comparePassword(
          oldPassword,
          user.password,
        );
        if (!isCorrectOldPassword) {
          throw new common_16.BadRequestException('Old password is incorrect');
        }
        const newEncryptedPassword = yield this.passwordService.encryptPassword(newPassword);
        const updatedUser = yield this.userService.updateUser(user.id, {
          password: newEncryptedPassword,
        });
        delete updatedUser.password;
        return updatedUser;
      });
    }
    getUserByEmail(email) {
      return __awaiter(this, void 0, void 0, function* () {
        return this.userService.getUser({ email });
      });
    }
    generateAndSendOtp(email) {
      return __awaiter(this, void 0, void 0, function* () {
        const user = yield this.userService.getUser({ email });
        if (!user) {
          throw new common_16.HttpException('User not found', common_16.HttpStatus.NOT_FOUND);
        }
        yield this.otpService.generateAndSendOtp({
          otpType: otp_2.OtpType.RESET_PASSWORD,
          recipientName: user.username,
          targetEmail: email,
          userId: user.id,
        });
      });
    }
    validateOtp(email, otp) {
      return __awaiter(this, void 0, void 0, function* () {
        const user = yield this.userService.getUser({ email });
        if (!user) {
          throw new common_16.HttpException('User not found', common_16.HttpStatus.NOT_FOUND);
        }
        return this.otpService.isValidOtp(user.id, otp_2.OtpType.RESET_PASSWORD, otp);
      });
    }
    resetPassword(email, newPassword) {
      return __awaiter(this, void 0, void 0, function* () {
        const user = yield this.userService.getUser({ email });
        if (!user) {
          throw new common_16.HttpException('User not found', common_16.HttpStatus.NOT_FOUND);
        }
        const encryptedPassword = yield this.passwordService.encryptPassword(newPassword);
        yield this.userService.updateUser(user.id, { password: encryptedPassword });
      });
    }
  };
  exports.AuthService = AuthService;
  exports.AuthService = AuthService = __decorate(
    [
      (0, common_16.Injectable)(),
      __metadata('design:paramtypes', [
        jwt_1.JwtService,
        config_3.ConfigService,
        user_2.UserService,
        password_service_1.PasswordService,
        otp_2.OtpService,
      ]),
    ],
    AuthService,
  );
});
define('auth/service/index', [
  'require',
  'exports',
  'auth/service/auth.service',
  'auth/service/password.service',
], function (require, exports, auth_service_1, password_service_2) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  __exportStar(auth_service_1, exports);
  __exportStar(password_service_2, exports);
});
define('guards/jwt-auth.guard', [
  'require',
  'exports',
  '@nestjs/common',
  '@nestjs/passport',
], function (require, exports, common_17, passport_1) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  exports.JwtAuthGuard = void 0;
  let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    canActivate(context) {
      return super.canActivate(context);
    }
    handleRequest(err, user) {
      if (err || !user) {
        throw new common_17.UnauthorizedException('Invalid or expired token');
      }
      return user;
    }
  };
  exports.JwtAuthGuard = JwtAuthGuard;
  exports.JwtAuthGuard = JwtAuthGuard = __decorate([(0, common_17.Injectable)()], JwtAuthGuard);
});
define('auth/dto/reset-password.dto', [
  'require',
  'exports',
  '@nestjs/swagger',
  'class-validator',
], function (require, exports, swagger_9, class_validator_7) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  exports.ResetPasswordDto = void 0;
  class ResetPasswordDto {}
  exports.ResetPasswordDto = ResetPasswordDto;
  __decorate(
    [
      (0, swagger_9.ApiProperty)({
        example: 'example@example.com',
        required: true,
        description: 'Must be a valid email address.',
      }),
      (0, class_validator_7.IsEmail)({}, { message: 'Email must be a valid email address.' }),
      (0, class_validator_7.IsNotEmpty)(),
      __metadata('design:type', String),
    ],
    ResetPasswordDto.prototype,
    'email',
    void 0,
  );
  __decorate(
    [
      (0, swagger_9.ApiProperty)({
        example: 11111,
        required: true,
        description: 'Must be a valid OTP code.',
      }),
      (0, class_validator_7.IsNumber)({}, { message: 'otp must be a valid number' }),
      (0, class_validator_7.IsNotEmpty)(),
      __metadata('design:type', Number),
    ],
    ResetPasswordDto.prototype,
    'otp',
    void 0,
  );
  __decorate(
    [
      (0, swagger_9.ApiProperty)({
        example: 'Test@123',
        required: true,
        description: 'Password must be at least 6 characters long.',
      }),
      (0, class_validator_7.IsString)(),
      (0, class_validator_7.MinLength)(6, {
        message: 'New password must be at least 6 characters long',
      }),
      (0, class_validator_7.Matches)(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/, {
        message:
          'New password must contain at least one uppercase letter, one lowercase letter, and one number',
      }),
      (0, class_validator_7.IsNotEmpty)(),
      __metadata('design:type', String),
    ],
    ResetPasswordDto.prototype,
    'newPassword',
    void 0,
  );
});
define('auth/dto/forget-password.dto', [
  'require',
  'exports',
  '@nestjs/swagger',
  'class-validator',
], function (require, exports, swagger_10, class_validator_8) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  exports.ForgetPasswordDto = void 0;
  class ForgetPasswordDto {}
  exports.ForgetPasswordDto = ForgetPasswordDto;
  __decorate(
    [
      (0, swagger_10.ApiProperty)({
        example: 'example@example.com',
        required: true,
        description: 'Must be a valid email address.',
      }),
      (0, class_validator_8.IsEmail)({}, { message: 'Email must be a valid email address.' }),
      (0, class_validator_8.IsNotEmpty)(),
      __metadata('design:type', String),
    ],
    ForgetPasswordDto.prototype,
    'email',
    void 0,
  );
});
define('auth/auth.controller', [
  'require',
  'exports',
  '@nestjs/common',
  '@nestjs/swagger',
  'auth/service/index',
  'auth/dto/index',
  'auth/dto/resendSignup.dto',
  'auth/dto/resendSignupResponse.dto',
  'auth/dto/verifySignupOtp.dto',
  'auth/dto/verifySignupOtpResponse.dto',
  '../guards/jwt-auth.guard',
  '../user',
  'auth/dto/change-password.dto',
  'auth/dto/reset-password.dto',
  'auth/dto/forget-password.dto',
], function (
  require,
  exports,
  common_18,
  swagger_11,
  service_1,
  dto_1,
  resendSignup_dto_2,
  resendSignupResponse_dto_2,
  verifySignupOtp_dto_2,
  verifySignupOtpResponse_dto_2,
  jwt_auth_guard_1,
  user_3,
  change_password_dto_1,
  reset_password_dto_1,
  forget_password_dto_1,
) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  exports.AuthController = void 0;
  let AuthController = class AuthController {
    constructor(authService) {
      this.authService = authService;
    }
    signup(signupDto) {
      return this.authService.signupService(signupDto);
    }
    resendSignupOtp(resendSignupDto) {
      return this.authService.resendSignupService(resendSignupDto);
    }
    verifySignupOtp(verifySignupOtpDto) {
      return this.authService.verifySignupOtpService(verifySignupOtpDto);
    }
    login(loginDto) {
      return this.authService.login(loginDto);
    }
    refreshToken(body) {
      return __awaiter(this, void 0, void 0, function* () {
        return yield this.authService.refreshToken(body.refreshToken);
      });
    }
    changePassword(req, changePasswordDto) {
      return __awaiter(this, void 0, void 0, function* () {
        const userId = req.user.id;
        return this.authService.changePassword(userId, changePasswordDto);
      });
    }
    forgetPassword(forgetPasswordDto) {
      return __awaiter(this, void 0, void 0, function* () {
        const { email } = forgetPasswordDto;
        const user = yield this.authService.getUserByEmail(email);
        if (!user) {
          throw new common_18.HttpException('User not found', common_18.HttpStatus.NOT_FOUND);
        }
        yield this.authService.generateAndSendOtp(email);
        return { message: 'OTP sent to email.' };
      });
    }
    resetPassword(resetPasswordDto) {
      return __awaiter(this, void 0, void 0, function* () {
        const { email, otp, newPassword } = resetPasswordDto;
        const isValidOtp = yield this.authService.validateOtp(email, otp);
        if (!isValidOtp) {
          throw new common_18.HttpException(
            'Invalid OTP or email',
            common_18.HttpStatus.BAD_REQUEST,
          );
        }
        yield this.authService.resetPassword(email, newPassword);
        return { message: 'Password reset successfully.' };
      });
    }
  };
  exports.AuthController = AuthController;
  __decorate(
    [
      (0, common_18.Post)('signup'),
      (0, common_18.HttpCode)(common_18.HttpStatus.CREATED),
      (0, swagger_11.ApiOperation)({
        summary: 'Create new account by Sign Up with your credentials',
      }),
      (0, swagger_11.ApiResponse)({
        status: common_18.HttpStatus.CREATED,
        description: 'User has been created.',
      }),
      (0, swagger_11.ApiResponse)({
        status: common_18.HttpStatus.CONFLICT,
        description: 'Username or email already exist.',
      }),
      (0, swagger_11.ApiResponse)({
        status: common_18.HttpStatus.BAD_REQUEST,
        description: 'Invalid request payload.',
      }),
      (0, swagger_11.ApiBody)({ type: dto_1.SignupDto }),
      __param(0, (0, common_18.Body)()),
      __metadata('design:type', Function),
      __metadata('design:paramtypes', [dto_1.SignupDto]),
      __metadata('design:returntype', void 0),
    ],
    AuthController.prototype,
    'signup',
    null,
  );
  __decorate(
    [
      (0, common_18.Post)('resend-signup-otp'),
      (0, common_18.HttpCode)(common_18.HttpStatus.OK),
      (0, swagger_11.ApiOperation)({
        summary: 'resend the otp for new user account',
      }),
      (0, swagger_11.ApiResponse)({
        status: common_18.HttpStatus.OK,
        description: 'OTP resent successfully.',
        type: resendSignupResponse_dto_2.ResendSignupResponseDTO,
      }),
      (0, swagger_11.ApiResponse)({
        status: common_18.HttpStatus.BAD_REQUEST,
        description: 'Invalid email address.',
      }),
      (0, swagger_11.ApiResponse)({
        status: common_18.HttpStatus.NOT_FOUND,
        description: 'Not found user',
      }),
      (0, swagger_11.ApiBody)({ type: resendSignup_dto_2.ResendSignupDto }),
      __param(0, (0, common_18.Body)()),
      __metadata('design:type', Function),
      __metadata('design:paramtypes', [resendSignup_dto_2.ResendSignupDto]),
      __metadata('design:returntype', Promise),
    ],
    AuthController.prototype,
    'resendSignupOtp',
    null,
  );
  __decorate(
    [
      (0, common_18.Post)('verify-signup-otp'),
      (0, common_18.HttpCode)(common_18.HttpStatus.OK),
      (0, swagger_11.ApiOperation)({
        summary: 'verify the otp for new user account (12345 for testing)',
      }),
      (0, swagger_11.ApiResponse)({
        status: common_18.HttpStatus.OK,
        description: 'OTP verified successfully.',
        type: verifySignupOtpResponse_dto_2.VerifySignupOtpResponseDto,
      }),
      (0, swagger_11.ApiResponse)({
        status: common_18.HttpStatus.BAD_REQUEST,
        description: 'Invalid email or otp.',
      }),
      (0, swagger_11.ApiResponse)({
        status: common_18.HttpStatus.NOT_FOUND,
        description: 'Not found user',
      }),
      (0, swagger_11.ApiBody)({ type: verifySignupOtp_dto_2.VerifySignupOtpDto }),
      __param(0, (0, common_18.Body)()),
      __metadata('design:type', Function),
      __metadata('design:paramtypes', [verifySignupOtp_dto_2.VerifySignupOtpDto]),
      __metadata('design:returntype', Promise),
    ],
    AuthController.prototype,
    'verifySignupOtp',
    null,
  );
  __decorate(
    [
      (0, common_18.Post)('login'),
      (0, common_18.HttpCode)(common_18.HttpStatus.OK),
      (0, swagger_11.ApiBody)({ type: dto_1.LoginDto }),
      __param(0, (0, common_18.Body)()),
      __metadata('design:type', Function),
      __metadata('design:paramtypes', [dto_1.LoginDto]),
      __metadata('design:returntype', void 0),
    ],
    AuthController.prototype,
    'login',
    null,
  );
  __decorate(
    [
      (0, common_18.Post)('refresh-token'),
      (0, common_18.HttpCode)(common_18.HttpStatus.OK),
      (0, swagger_11.ApiBody)({ type: dto_1.RefreshTokenDto }),
      __param(0, (0, common_18.Body)()),
      __metadata('design:type', Function),
      __metadata('design:paramtypes', [dto_1.RefreshTokenDto]),
      __metadata('design:returntype', Promise),
    ],
    AuthController.prototype,
    'refreshToken',
    null,
  );
  __decorate(
    [
      (0, common_18.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
      (0, swagger_11.ApiBearerAuth)(),
      (0, common_18.Patch)('change-password'),
      (0, swagger_11.ApiResponse)({
        status: common_18.HttpStatus.OK,
        description: 'Password changed successfully.',
        type: user_3.User,
      }),
      (0, swagger_11.ApiResponse)({
        status: common_18.HttpStatus.BAD_REQUEST,
        description: 'Old password is incorrect.',
      }),
      (0, swagger_11.ApiResponse)({
        status: common_18.HttpStatus.NOT_FOUND,
        description: 'User not found.',
      }),
      (0, swagger_11.ApiResponse)({
        status: common_18.HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal server error.',
      }),
      __param(0, (0, common_18.Req)()),
      __param(1, (0, common_18.Body)()),
      __metadata('design:type', Function),
      __metadata('design:paramtypes', [Object, change_password_dto_1.ChangePasswordDto]),
      __metadata('design:returntype', Promise),
    ],
    AuthController.prototype,
    'changePassword',
    null,
  );
  __decorate(
    [
      (0, common_18.Post)('forget-password'),
      (0, swagger_11.ApiResponse)({
        status: common_18.HttpStatus.OK,
        description: 'OTP sent to email.',
      }),
      (0, swagger_11.ApiResponse)({
        status: common_18.HttpStatus.NOT_FOUND,
        description: 'User not found.',
      }),
      (0, swagger_11.ApiResponse)({
        status: common_18.HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal server error.',
      }),
      __param(0, (0, common_18.Body)()),
      __metadata('design:type', Function),
      __metadata('design:paramtypes', [forget_password_dto_1.ForgetPasswordDto]),
      __metadata('design:returntype', Promise),
    ],
    AuthController.prototype,
    'forgetPassword',
    null,
  );
  __decorate(
    [
      (0, common_18.Post)('reset-password'),
      (0, swagger_11.ApiResponse)({
        status: common_18.HttpStatus.OK,
        description: 'Password reset successfully.',
      }),
      (0, swagger_11.ApiResponse)({
        status: common_18.HttpStatus.BAD_REQUEST,
        description: 'Invalid OTP or email.',
      }),
      (0, swagger_11.ApiResponse)({
        status: common_18.HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal server error.',
      }),
      __param(0, (0, common_18.Body)()),
      __metadata('design:type', Function),
      __metadata('design:paramtypes', [reset_password_dto_1.ResetPasswordDto]),
      __metadata('design:returntype', Promise),
    ],
    AuthController.prototype,
    'resetPassword',
    null,
  );
  exports.AuthController = AuthController = __decorate(
    [
      (0, swagger_11.ApiTags)('auth'),
      (0, common_18.Controller)('auth'),
      __metadata('design:paramtypes', [service_1.AuthService]),
    ],
    AuthController,
  );
});
define('auth/strategies/jwt.strategy', [
  'require',
  'exports',
  '@nestjs/common',
  '@nestjs/passport',
  'passport-jwt',
  '@nestjs/config',
], function (require, exports, common_19, passport_2, passport_jwt_1, config_4) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  exports.JwtStrategy = void 0;
  let JwtStrategy = class JwtStrategy extends (0, passport_2.PassportStrategy)(
    passport_jwt_1.Strategy,
    'jwt',
  ) {
    constructor(configService) {
      super({
        jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: configService.get('JWT_SECRET'),
      });
      this.configService = configService;
    }
    validate(payload) {
      return __awaiter(this, void 0, void 0, function* () {
        return { id: payload.id, email: payload.email };
      });
    }
  };
  exports.JwtStrategy = JwtStrategy;
  exports.JwtStrategy = JwtStrategy = __decorate(
    [(0, common_19.Injectable)(), __metadata('design:paramtypes', [config_4.ConfigService])],
    JwtStrategy,
  );
});
define('auth/auth.module', [
  'require',
  'exports',
  '@nestjs/common',
  '@nestjs/jwt',
  '@nestjs/config',
  'auth/service/index',
  'auth/auth.controller',
  '../logger',
  '../user',
  '../otp',
  '@nestjs/typeorm',
  '@nestjs/passport',
  'auth/strategies/jwt.strategy',
], function (
  require,
  exports,
  common_20,
  jwt_2,
  config_5,
  service_2,
  auth_controller_1,
  logger_2,
  user_4,
  otp_3,
  typeorm_9,
  passport_3,
  jwt_strategy_1,
) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  exports.AuthModule = void 0;
  let AuthModule = class AuthModule {};
  exports.AuthModule = AuthModule;
  exports.AuthModule = AuthModule = __decorate(
    [
      (0, common_20.Module)({
        imports: [
          config_5.ConfigModule,
          typeorm_9.TypeOrmModule.forFeature([user_4.User]),
          passport_3.PassportModule.register({ defaultStrategy: 'jwt' }),
          jwt_2.JwtModule.registerAsync({
            imports: [config_5.ConfigModule],
            inject: [config_5.ConfigService],
            useFactory: (configService) =>
              __awaiter(void 0, void 0, void 0, function* () {
                return {
                  secret: configService.get('JWT_SECRET'),
                  signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN') },
                };
              }),
          }),
          logger_2.LoggerModule,
          user_4.UserModule,
          otp_3.OtpModule,
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [service_2.AuthService, jwt_strategy_1.JwtStrategy, service_2.PasswordService],
        exports: [service_2.AuthService, jwt_strategy_1.JwtStrategy, passport_3.PassportModule],
      }),
    ],
    AuthModule,
  );
});
define('auth/index', [
  'require',
  'exports',
  'auth/auth.module',
  'auth/auth.controller',
  'auth/service/index',
  'auth/dto/index',
  'auth/auth.interface',
], function (
  require,
  exports,
  auth_module_1,
  auth_controller_2,
  service_3,
  dto_2,
  auth_interface_1,
) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  __exportStar(auth_module_1, exports);
  __exportStar(auth_controller_2, exports);
  __exportStar(service_3, exports);
  __exportStar(dto_2, exports);
  __exportStar(auth_interface_1, exports);
});
define('cleanup/cleanup.service', [
  'require',
  'exports',
  '@nestjs/common',
  '@nestjs/schedule',
  'fs',
  'path',
  '../logger',
], function (require, exports, common_21, schedule_1, fs, path, logger_3) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  exports.CleanupService = void 0;
  fs = __importStar(fs);
  path = __importStar(path);
  let CleanupService = class CleanupService {
    constructor(logger) {
      this.logger = logger;
    }
    cleanOldLogs() {
      return __awaiter(this, void 0, void 0, function* () {
        try {
          const logDir = 'logs';
          const now = new Date();
          fs.readdir(logDir, (err, files) => {
            if (err) {
              this.logger.error('Error reading log directory', err.stack);
              return;
            }
            files.forEach((file) => {
              const filePath = path.join(logDir, file);
              fs.stat(filePath, (err, stats) => {
                if (err) {
                  this.logger.error(`Error reading log file stats: ${filePath}`, err.stack);
                  return;
                }
                const fileAge = (now.getTime() - stats.mtime.getTime()) / (1000 * 60 * 60 * 24);
                if (fileAge > 14) {
                  fs.unlink(filePath, (err) => {
                    if (err) {
                      this.logger.error(`Failed to delete log file: ${filePath}`, err.stack);
                    } else {
                      this.logger.info(`Deleted old log file: ${filePath}`);
                    }
                  });
                }
              });
            });
          });
        } catch (error) {
          this.logger.error('Error during log cleanup', error.stack);
        }
      });
    }
  };
  exports.CleanupService = CleanupService;
  __decorate(
    [
      (0, schedule_1.Cron)('0 1 * * *'),
      __metadata('design:type', Function),
      __metadata('design:paramtypes', []),
      __metadata('design:returntype', Promise),
    ],
    CleanupService.prototype,
    'cleanOldLogs',
    null,
  );
  exports.CleanupService = CleanupService = __decorate(
    [(0, common_21.Injectable)(), __metadata('design:paramtypes', [logger_3.LoggerService])],
    CleanupService,
  );
});
define('cleanup/cleanup.module', [
  'require',
  'exports',
  '@nestjs/common',
  '@nestjs/schedule',
  'cleanup/cleanup.service',
  '../logger',
], function (require, exports, common_22, schedule_2, cleanup_service_1, logger_4) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  exports.CleanupModule = void 0;
  let CleanupModule = class CleanupModule {};
  exports.CleanupModule = CleanupModule;
  exports.CleanupModule = CleanupModule = __decorate(
    [
      (0, common_22.Module)({
        imports: [schedule_2.ScheduleModule.forRoot(), logger_4.LoggerModule],
        providers: [cleanup_service_1.CleanupService],
      }),
    ],
    CleanupModule,
  );
});
define('cleanup/index', [
  'require',
  'exports',
  'cleanup/cleanup.module',
  'cleanup/cleanup.service',
], function (require, exports, cleanup_module_1, cleanup_service_2) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  __exportStar(cleanup_module_1, exports);
  __exportStar(cleanup_service_2, exports);
});
define('profile/dto/updateProfile.dto', [
  'require',
  'exports',
  'class-validator',
  '@nestjs/swagger',
], function (require, exports, class_validator_9, swagger_12) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  exports.UpdateProfileDto = void 0;
  class UpdateProfileDto {}
  exports.UpdateProfileDto = UpdateProfileDto;
  __decorate(
    [
      (0, swagger_12.ApiPropertyOptional)({ description: 'First name of the user' }),
      (0, class_validator_9.IsOptional)(),
      (0, class_validator_9.IsString)(),
      __metadata('design:type', String),
    ],
    UpdateProfileDto.prototype,
    'firstName',
    void 0,
  );
  __decorate(
    [
      (0, swagger_12.ApiPropertyOptional)({ description: 'Last name of the user' }),
      (0, class_validator_9.IsOptional)(),
      (0, class_validator_9.IsString)(),
      __metadata('design:type', String),
    ],
    UpdateProfileDto.prototype,
    'lastName',
    void 0,
  );
  __decorate(
    [
      (0, swagger_12.ApiPropertyOptional)({
        description: 'Date of birth of the user',
        type: String,
        format: 'date',
      }),
      (0, class_validator_9.IsOptional)(),
      (0, class_validator_9.IsDateString)(),
      __metadata('design:type', Date),
    ],
    UpdateProfileDto.prototype,
    'dateOfBirth',
    void 0,
  );
});
define('profile/profile.service', [
  'require',
  'exports',
  '@nestjs/common',
  'user/user.service',
  'path',
  'fs',
], function (require, exports, common_23, user_service_3, path_1, fs_1) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  exports.ProfileService = void 0;
  let ProfileService = class ProfileService {
    constructor(userService) {
      this.userService = userService;
    }
    getProfile(userId) {
      return __awaiter(this, void 0, void 0, function* () {
        const user = yield this.userService.getUser({ id: userId });
        if (!user) {
          throw new common_23.NotFoundException('User not found');
        }
        delete user.password;
        return user;
      });
    }
    updateProfile(userId, updateProfileDto) {
      return __awaiter(this, void 0, void 0, function* () {
        const user = yield this.userService.getUser({ id: userId });
        if (!user) {
          throw new common_23.NotFoundException('User not found');
        }
        const updatedUser = yield this.userService.updateUser(userId, updateProfileDto);
        delete updatedUser.password;
        return updatedUser;
      });
    }
    updateProfilePicture(userId, file) {
      return __awaiter(this, void 0, void 0, function* () {
        const user = yield this.userService.getUser({ id: userId });
        if (!user) {
          throw new common_23.NotFoundException('User not found');
        }
        if (file.size > 15 * 1024 * 1024) {
          throw new common_23.BadRequestException('File size should not exceed 15 MB');
        }
        const validExtensions = ['png', 'jpeg', 'jpg'];
        const fileExtension = file.originalname.split('.').pop().toLowerCase();
        if (!validExtensions.includes(fileExtension)) {
          throw new common_23.BadRequestException(
            'Invalid file type. Only PNG, JPEG, and JPG are allowed',
          );
        }
        const storageDir = (0, path_1.join)(__dirname, '..', '..', 'storage', 'profile-pictures');
        if (!(0, fs_1.existsSync)(storageDir)) {
          (0, fs_1.mkdirSync)(storageDir, { recursive: true });
        }
        if (user.profilePicture) {
          const oldFilePath = (0, path_1.join)(__dirname, '..', '..', user.profilePicture);
          if ((0, fs_1.existsSync)(oldFilePath)) {
            yield fs_1.promises.unlink(oldFilePath);
          }
        }
        const filename = `${userId}-${Date.now()}.${fileExtension}`;
        const filePath = (0, path_1.join)(storageDir, filename);
        yield fs_1.promises.writeFile(filePath, file.buffer);
        const fileUrl = `/storage/profile-pictures/${filename}`;
        const updatedUser = yield this.userService.updateUser(userId, {
          profilePicture: fileUrl,
        });
        delete updatedUser.password;
        return updatedUser;
      });
    }
  };
  exports.ProfileService = ProfileService;
  exports.ProfileService = ProfileService = __decorate(
    [(0, common_23.Injectable)(), __metadata('design:paramtypes', [user_service_3.UserService])],
    ProfileService,
  );
});
define('profile/profile.controller', [
  'require',
  'exports',
  '@nestjs/common',
  '@nestjs/swagger',
  '@nestjs/passport',
  '@nestjs/platform-express',
  'profile/profile.service',
  'profile/dto/updateProfile.dto',
  'user/user.entity',
], function (
  require,
  exports,
  common_24,
  swagger_13,
  passport_4,
  platform_express_1,
  profile_service_1,
  updateProfile_dto_1,
  user_entity_4,
) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  exports.ProfileController = void 0;
  let ProfileController = class ProfileController {
    constructor(profileService) {
      this.profileService = profileService;
    }
    getProfile(req) {
      return __awaiter(this, void 0, void 0, function* () {
        const userId = req.user.id;
        return this.profileService.getProfile(userId);
      });
    }
    updateProfile(req, updateProfileDto) {
      return __awaiter(this, void 0, void 0, function* () {
        const userId = req.user.id;
        return this.profileService.updateProfile(userId, updateProfileDto);
      });
    }
    updateProfilePicture(req, file) {
      return __awaiter(this, void 0, void 0, function* () {
        const userId = req.user.id;
        return this.profileService.updateProfilePicture(userId, file);
      });
    }
  };
  exports.ProfileController = ProfileController;
  __decorate(
    [
      (0, common_24.Get)(),
      (0, common_24.UseGuards)((0, passport_4.AuthGuard)('jwt')),
      (0, swagger_13.ApiBearerAuth)(),
      (0, swagger_13.ApiResponse)({
        status: common_24.HttpStatus.OK,
        description: 'User profile retrieved successfully.',
        type: user_entity_4.User,
      }),
      (0, swagger_13.ApiResponse)({
        status: common_24.HttpStatus.NOT_FOUND,
        description: 'User not found.',
      }),
      __param(0, (0, common_24.Req)()),
      __metadata('design:type', Function),
      __metadata('design:paramtypes', [Object]),
      __metadata('design:returntype', Promise),
    ],
    ProfileController.prototype,
    'getProfile',
    null,
  );
  __decorate(
    [
      (0, common_24.Put)(),
      (0, common_24.UseGuards)((0, passport_4.AuthGuard)('jwt')),
      (0, swagger_13.ApiBearerAuth)(),
      (0, swagger_13.ApiResponse)({
        status: common_24.HttpStatus.OK,
        description: 'User profile updated successfully.',
        type: user_entity_4.User,
      }),
      (0, swagger_13.ApiResponse)({
        status: common_24.HttpStatus.NOT_FOUND,
        description: 'User not found.',
      }),
      __param(0, (0, common_24.Req)()),
      __param(1, (0, common_24.Body)()),
      __metadata('design:type', Function),
      __metadata('design:paramtypes', [Object, updateProfile_dto_1.UpdateProfileDto]),
      __metadata('design:returntype', Promise),
    ],
    ProfileController.prototype,
    'updateProfile',
    null,
  );
  __decorate(
    [
      (0, common_24.Post)('profile-picture'),
      (0, common_24.UseGuards)((0, passport_4.AuthGuard)('jwt')),
      (0, swagger_13.ApiBearerAuth)(),
      (0, common_24.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
      (0, swagger_13.ApiConsumes)('multipart/form-data'),
      (0, swagger_13.ApiBody)({
        description: 'Profile picture upload',
        schema: {
          type: 'object',
          properties: {
            file: {
              type: 'string',
              format: 'binary',
            },
          },
        },
      }),
      (0, swagger_13.ApiResponse)({
        status: common_24.HttpStatus.OK,
        description: 'Profile picture updated successfully.',
        type: user_entity_4.User,
      }),
      (0, swagger_13.ApiResponse)({
        status: common_24.HttpStatus.BAD_REQUEST,
        description: 'Invalid file type or size.',
      }),
      (0, swagger_13.ApiResponse)({
        status: common_24.HttpStatus.NOT_FOUND,
        description: 'User not found.',
      }),
      __param(0, (0, common_24.Req)()),
      __param(1, (0, common_24.UploadedFile)()),
      __metadata('design:type', Function),
      __metadata('design:paramtypes', [Object, Object]),
      __metadata('design:returntype', Promise),
    ],
    ProfileController.prototype,
    'updateProfilePicture',
    null,
  );
  exports.ProfileController = ProfileController = __decorate(
    [
      (0, swagger_13.ApiTags)('profile'),
      (0, common_24.Controller)('profile'),
      __metadata('design:paramtypes', [profile_service_1.ProfileService]),
    ],
    ProfileController,
  );
});
define('profile/profile.module', [
  'require',
  'exports',
  '@nestjs/common',
  'profile/profile.service',
  'profile/profile.controller',
  '../user',
], function (require, exports, common_25, profile_service_2, profile_controller_1, user_5) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  exports.ProfileModule = void 0;
  let ProfileModule = class ProfileModule {};
  exports.ProfileModule = ProfileModule;
  exports.ProfileModule = ProfileModule = __decorate(
    [
      (0, common_25.Module)({
        imports: [user_5.UserModule],
        providers: [profile_service_2.ProfileService],
        controllers: [profile_controller_1.ProfileController],
      }),
    ],
    ProfileModule,
  );
});
define('config/database.config', ['require', 'exports', '@nestjs/config', 'dotenv'], function (
  require,
  exports,
  config_6,
  dotenv,
) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  dotenv = __importStar(dotenv);
  dotenv.config();
  exports.default = (0, config_6.registerAs)('database', () => ({
    type: process.env.DB_TYPE || 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'test_db',
    synchronize: process.env.DB_SYNC === 'true',
    logging: process.env.DB_LOGGING === 'true',
  }));
});
define('config/app.config', ['require', 'exports', '@nestjs/config', 'dotenv'], function (
  require,
  exports,
  config_7,
  dotenv,
) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  dotenv = __importStar(dotenv);
  dotenv.config();
  exports.default = (0, config_7.registerAs)('app', () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    environment: process.env.NODE_ENV || 'development',
    jwtSecret: process.env.JWT_SECRET || 'defaultSecret',
    jwtExpiresIn: process.env.JWT_EXPIRATION || '1h',
    apiPrefix: process.env.API_PREFIX || 'api',
  }));
});
define('app.module', [
  'require',
  'exports',
  '@nestjs/common',
  'app.controller',
  '@nestjs/config',
  '@nestjs/typeorm',
  'auth/index',
  'user/index',
  'app.service',
  'logger/index',
  'cleanup/index',
  'mail/mail.module',
  'otp/otp.module',
  '@nestjs/throttler',
  '@nestjs/core',
  'profile/profile.module',
  'config/database.config',
  'config/app.config',
  '@nestjs/serve-static',
  'path',
], function (
  require,
  exports,
  common_26,
  app_controller_1,
  config_8,
  typeorm_10,
  auth_1,
  user_6,
  app_service_2,
  logger_5,
  cleanup_1,
  mail_module_2,
  otp_module_2,
  throttler_1,
  core_1,
  profile_module_1,
  database_config_1,
  app_config_1,
  serve_static_1,
  path_2,
) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  exports.AppModule = void 0;
  database_config_1 = __importDefault(database_config_1);
  app_config_1 = __importDefault(app_config_1);
  let AppModule = class AppModule {};
  exports.AppModule = AppModule;
  exports.AppModule = AppModule = __decorate(
    [
      (0, common_26.Module)({
        imports: [
          serve_static_1.ServeStaticModule.forRoot({
            rootPath: (0, path_2.join)(__dirname, '..', 'storage', 'profile-pictures'),
            serveRoot: '/api/storage/profile-pictures',
          }),
          config_8.ConfigModule.forRoot({
            isGlobal: true,
            load: [app_config_1.default, database_config_1.default],
            envFilePath: process.env.NODE_ENV === 'production' ? '.prod.env' : '.dev.env',
          }),
          typeorm_10.TypeOrmModule.forRootAsync({
            useFactory: (configService) => ({
              type: 'mysql',
              host: configService.get('DB_HOST'),
              port: configService.get('DB_PORT'),
              username: configService.get('DB_USERNAME'),
              password: configService.get('DB_PASSWORD'),
              database: configService.get('DB_NAME'),
              entities: [__dirname + '/**/*.entity{.ts,.js}'],
              synchronize: true,
            }),
            inject: [config_8.ConfigService],
          }),
          throttler_1.ThrottlerModule.forRoot([
            {
              name: 'short',
              ttl: 1000,
              limit: 10,
            },
            {
              name: 'medium',
              ttl: 10000,
              limit: 40,
            },
            {
              name: 'long',
              ttl: 60000,
              limit: 500,
            },
          ]),
          logger_5.LoggerModule,
          cleanup_1.CleanupModule,
          user_6.UserModule,
          auth_1.AuthModule,
          mail_module_2.MailModule,
          otp_module_2.OtpModule,
          profile_module_1.ProfileModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
          app_service_2.AppService,
          {
            provide: core_1.APP_GUARD,
            useClass: throttler_1.ThrottlerGuard,
          },
        ],
      }),
    ],
    AppModule,
  );
});
define('main', [
  'require',
  'exports',
  '@nestjs/core',
  'app.module',
  '@nestjs/swagger',
  'common/index',
], function (require, exports, core_2, app_module_1, swagger_14, common_27) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
      const app = yield core_2.NestFactory.create(app_module_1.AppModule);
      app.setGlobalPrefix('api');
      app.useGlobalPipes(common_27.DtoValidationPipe);
      const config = new swagger_14.DocumentBuilder()
        .setTitle('Asal API Documentation')
        .setDescription('Backend template for Asal technology')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
      const document = swagger_14.SwaggerModule.createDocument(app, config);
      swagger_14.SwaggerModule.setup('api', app, document);
      const port = process.env.PORT || 3000;
      yield app.listen(port);
    });
  }
  bootstrap().catch((err) => {
    console.error('Error during bootstrap:', err);
    process.exit(1);
  });
});
//# sourceMappingURL=main.cjs.map
