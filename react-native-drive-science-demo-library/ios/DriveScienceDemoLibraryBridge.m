#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(DriveScienceDemoLibrary, NSObject)

RCT_EXTERN_METHOD(initialize:(NSString *)clientId
                  environmentString:(NSString *)environmentString)

RCT_EXTERN_METHOD(setToken:(NSString*)token
                  tokenCallback:(RCTResponseSenderBlock)tokenCallback)

RCT_EXTERN_METHOD(activate:(RCTResponseSenderBlock)trackerCallback)

RCT_EXTERN_METHOD(deactivate)

RCT_EXTERN_METHOD(isActive)

@end

