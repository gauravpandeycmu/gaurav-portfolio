// Notes use stable slide titles, not slide numbers, so insertions do not shift them.
const slideNotes = {
  'The problem': ['The goal is a time-indexed camera state for broadcast AR. Our current experiment fixes the surveyed rooftop position and estimates orientation and horizontal field of view. The boat background is an illustration.'],
  'Team and Advisor': ['The team appears in alphabetical order by first name. Stacy Rosenberg is the advisor and is listed separately from the five team members.'],
  'Agenda': ['The presentation moves from the broadcast problem and related research to the supplied inputs, software method, current evidence and next experiments.'],
  'The broadcast': ['This E1 Dubrovnik GP excerpt introduces the race and broadcast environment. The clip comes from the supplied broadcast, not our tracking pipeline.', [['Broadcast source', 'https://www.youtube.com/watch?v=NKaab-nflw4']]],
  'Why camera state matters': ['AR rendering needs the camera view to stay aligned with the real image as direction and zoom change. The broadcast graphics here illustrate the intended use; our team did not produce those graphics.', [['Broadcast source', 'https://www.youtube.com/watch?v=NKaab-nflw4']]],
  'Four camera values': ['Yaw turns left/right, pitch looks up/down and roll rotates around the viewing axis. HFOV describes visible horizontal coverage, with smaller angles meaning more zoom. This animation uses teaching values, not recovered telemetry.'],
  'Hardware to software animation': ['Conventional systems combine head readings, lens information and venue alignment. The animation shows the software target after sensor removal, not demonstrated equivalence to hardware accuracy.', [['Encoded head example', 'https://mo-sys.com/products/e-sensor/']]],
  'Hardware and software': ['Hardware cost and one-camera coverage are constraints reported for this project, not a universal industry limit. Systems differ in setup and may reuse calibration. Software still needs reliable landmark geometry and camera/lens assumptions.', [['Mo-Sys e-Sensor', 'https://mo-sys.com/products/e-sensor/'], ['StarTracker setup example', 'https://mo-sys.com/news/mo-sys-tracks-the-stars/']]],
  'Literature review': ['SIFT, Lucas–Kanade and a 1€-inspired filter connect directly to the implementation. OpenCV documents the projection model. BroadTrack is newly reviewed related work, not a method implemented or benchmarked by this project. The Mo-Sys entry is vendor documentation, not a research paper.', [['BroadTrack paper', 'https://arxiv.org/abs/2412.01721'], ['1€ Filter authors’ page', 'https://gery.casiez.net/1euro/']]],
  'Inputs': ['We have a digital twin, geographic survey, lens calibration file and race recording. Having these assets does not by itself verify their conventions or integrate the twin into the solver.'],
  'KML survey': ['KML stores named geographic points; we convert them to a local east/north/up frame in metres. A known 3D point must match the correct image pixel. The BXR source altitudes are zeroed and are not verified architecture heights.'],
  'Survey fly-through': ['The dashed scene is a visual tour, not reconstructed terrain or actual drone footage. Coordinate labels come from the project KML. The virtual observer moves while the surveyed camera and reference points remain fixed.'],
  'Digital twin': ['The image is an actual structural normals render of the city geometry in Unreal, rather than a photorealistic scene. The current Python pose solver runs outside Unreal; twin-based validation remains future work.'],
  'Focal length': ['HFOV readouts come from recorded provisional estimates. Relative magnification uses effective focal pixels relative to the wider 225 s frame, not a Canon encoder reading. The footage also pans, so apparent motion is not caused only by zoom.'],
  'Lens distortion': ['The animation uses an illustrative radial model, not Canon coefficients. Different rays imply different lateral spacing only on the explicitly known distance plane; a pixel alone cannot recover depth. The default solver currently uses zero distortion.', [['Camera and distortion model', 'https://docs.opencv.org/4.x/dc/dbb/tutorial_py_calibration.html']]],
  'Race footage': ['This is the supplied Camera 1 recording near 195–205 s at 1920 × 1080 and 25 fps. The first experiment assumes a fixed surveyed pivot; pan, tilt, small roll and HFOV can vary.'],
  'The pipeline': ['The tracker finds image coordinates. Bounded smoothing refines visible measurements. The fixed-position estimator matches those pixels to surveyed 3D points. Lens variants were tested but were not promoted into the default model.'],
  'Track points': ['Human annotations initialize named landmarks. SIFT reference matching and checked Lucas–Kanade flow carry them through land motion. Water and boats are not camera references. Missing evidence remains missing.', [['SIFT paper', 'https://www.cs.ubc.ca/~lowe/papers/ijcv04.pdf'], ['OpenCV optical flow', 'https://docs.opencv.org/4.x/d4/dee/tutorial_optical_flow.html']]],
  'How OpenCV tracks': ['The animation uses actual 190/195 s image-pair matches and RANSAC filtering. It illustrates reference matching rather than live optical flow. Transferred BXR locations are automatic predictions, not additional manually verified observations.'],
  'Smooth points': ['The paired video compares an already-smoothed baseline with immediate reference recovery. The 9-to-2 short-gap result belongs to the full 165–195 s local replay. Later reference frames make this an offline demonstration, not proof of live recovery.'],
  'How smoothing works': ['The causal filter smooths shared translation, rotation and scale with a 1.5 native-pixel displacement cap. It resets on changed identities or gaps. Recovery separately requires a supported current-image match and a short timeout.', [['1€ Filter foundation', 'https://gery.casiez.net/1euro/']]],
  'Island continuity graph': ['Restyled from the saved 165–195 s local replay: teal shows observations, purple shows recovery and pale tracks show missing data. Both panels already use smoothing. Short region-wide gaps (≤0.8 s) fall from 9 to 2; baseline coordinates stay unchanged. This offline result measures availability, not accuracy.', [['Source notebook method', 'https://github.com/BADASS-Studios/BADASS-Capstone/blob/7666487/Landmark_Tracking.ipynb']]],
  'Estimate camera': ['The surveyed position stays fixed. A least-squares fit adjusts pan, tilt, roll and focal/HFOV to minimize pixel reprojection error. The default is centred pinhole without distortion. A numerical fit can succeed while the exported state remains invalid.'],
  'How camera estimation works': ['This is a synthetic teaching scene with exact pinhole projection. It shows why matching 3D points and 2D pixels constrains orientation and zoom. It is not a recovered Dubrovnik pose or independent accuracy evidence.'],
  'Camera demo': ['Left holds the first camera estimate fixed; right reprojects the same 3D wireframe using each new camera estimate. The right-hand geometry is camera-projected, not just OpenCV markers. Reusing fit landmarks makes this a consistency check, not absolute angle ground truth.'],
  'Current evidence': ['The 750 states are provisional fits over 195–225 s. BXR-6 was excluded from the fit; 4.01 px is its median camera-to-manual-click error on six frames. Across all five points, median/p95 are 5.32/18.04 px. Absolute angles remain unverified and exported validity is false.'],
  'Next: island': ['Island points already have image tracks, but their verified 3D coordinates and heights are unresolved. Match physical features to twin geometry, then test excluded features before claiming island camera pose.'],
  'Next demonstration': ['An independently calibrated twin camera could provide a comparison reference. Driving the twin with our own estimates only checks consistency; it does not create independent ground truth. Whole-video state output remains a target.'],
  'Next: live system': ['A short 190–201 s live processing loop matches frozen replay numerically. This does not establish full-tape live 25 fps or real-loss recovery. Next measurements should include end-to-end latency, availability, recovery and false-valid rate.'],
  'Thank you / Discussion': ['Discussion topics: independent angle verification, reliable island geometry, causal references and live feasibility. The looping boats and ocean are decorative, not tracking output.']
};
// Keep the original explanations and add context for readers without a presenter.
const slideDetails = {
  'The problem': [
    ['Why this matters', 'Broadcast AR draws virtual objects through a virtual camera. If its direction or zoom differs from the broadcast camera, graphics drift over the image. Recovering those camera values from video could reduce dependence on dedicated tracking equipment.'],
    ['Scope of this experiment', 'Here, “camera state” means pan, tilt, roll and horizontal field of view over time. We do not recover a new rooftop position for every frame. A fixed surveyed position removes several unknowns, but its accuracy still affects the result.']
  ],
  'Team and Advisor': [
    ['Project team', 'Arturo Arias, Gaurav Pandey, Medha Badamikar, Raghav Sharma and Raj Bhuyan are the five team members. The project brings together landmark tracking, pixel refinement, geographic camera estimation and integration checks. This slide does not assign individual responsibilities.'],
    ['Advisor', 'Stacy Rosenberg appears separately as the advisor. The layout distinguishes the student team from the advising role. The following slides describe the project’s combined work rather than attributing each result to a person.']
  ],
  'Agenda': [
    ['How the story fits together', 'First, the broadcast examples explain why camera direction and zoom matter. The research and inputs then establish what information we can use. The method section separates finding image points, improving their continuity and solving camera geometry.'],
    ['How to read the results', 'Some visuals teach the geometry, while others show measured project output. The results section distinguishes a working numerical pipeline from independently verified accuracy. The final section explains which experiments would strengthen the evidence and enable live use.']
  ],
  'The broadcast': [
    ['What to notice', 'The race takes place around Dubrovnik’s coastal setting. Shore views contain static city or island features, while onboard views change both camera position and scene content. Recognizable land gives the software evidence that moving water and racing boats cannot reliably provide.'],
    ['Connection to our work', 'This excerpt establishes the broadcast setting rather than demonstrating our solver. Our current experiment uses the supplied Camera 1 recording. Extending the method to other broadcast cameras would require each camera’s geometry and suitable visible references.']
  ],
  'Why camera state matters': [
    ['What the AR example shows', 'An AR graphic has a location in the scene, but viewers see its projected pixels. The rendering camera must follow the broadcast view through pans, tilts and zooms. Otherwise a graphic that should stay fixed appears to slide or scale incorrectly.'],
    ['What we need to deliver', 'The intended output is camera information at each video time, with an availability and confidence signal. A good-looking overlay alone does not establish correct angles. Independent evidence must test whether the estimated camera really explains the visible scene.']
  ],
  'Four camera values': [
    ['Reading the animation', 'Yaw or pan turns the camera sideways. Pitch or tilt changes its upward/downward direction. Roll rotates the image around the viewing axis. Horizontal field of view controls how wide the camera sees without moving its physical position.'],
    ['Why zoom is an angle here', 'We use HFOV until the lens-file conventions are verified. A smaller HFOV magnifies the scene. These teaching values illustrate the effects; they are not measured encoder readings. Angle signs also depend on the coordinate convention, so values need an explicit frame definition.']
  ],
  'Hardware to software animation': [
    ['Following the sequence', 'The animation starts with venue/lens alignment and tracked camera readings. It then removes the sensor-derived readings and shows visible landmarks feeding a software estimate. This makes the desired replacement clear without claiming the two sources already achieve equal accuracy.'],
    ['Calibration still has a role', 'Replacing sensor measurements does not remove the need to connect the image to the real world. The software needs the correct camera location, world references and projection model. Errors in these inputs can produce plausible-looking but biased camera values.']
  ],
  'Hardware and software': [
    ['Conventional setup', 'A tracked head measures motion, and lens information helps describe the changing image projection. Venue alignment connects those readings to world coordinates. The specific equipment, calibration steps and reuse of calibration vary by system; the vendor examples are not universal requirements.'],
    ['The project’s trade-off', 'BADASS Studios reports hardware and setup costs limiting current coverage. Software aims to extend that coverage using video and known landmarks. It trades sensor dependence for dependence on visible, correctly identified static evidence, which fog, occlusion or open water can reduce.']
  ],
  'Literature review': [
    ['Foundations used in the code', 'SIFT supports reference-image matching and Lucas–Kanade supports between-frame feature motion. RANSAC rejects feature matches that disagree with the estimated image transformation. The 1€ filter idea informs speed-adaptive smoothing. Camera calibration documentation describes how intrinsics, distortion and rotation connect world points to pixels. The project adapts these building blocks rather than training a pose network.'],
    ['Related work and its limits', 'BroadTrack motivates using camera/tripod constraints in broadcast tracking. Its soccer setting supplies field markings that our coastline does not. Mo-Sys documents a hardware alternative. Neither source independently verifies our results or establishes hardware/software performance equivalence for Dubrovnik.']
  ],
  'Inputs': [
    ['What each input contributes', 'The recording supplies image measurements. KML supplies named geographic positions. The lens file supplies calibration samples whose conventions need checking. The digital twin supplies a 3D venue that can support landmark identification, rendering and later camera-view comparisons.'],
    ['The important integration step', 'These inputs must describe the same physical points and camera. Geographic metres, Unreal centimetres, image pixels and lens normalization are different conventions. A usable pipeline needs verified conversions and correspondences, not simply all four files loaded together.']
  ],
  'KML survey': [
    ['World point plus image point', 'A named KML point identifies a physical reference in geographic coordinates. Converting it to local east/north/up metres lets us compare its direction from the surveyed camera with the direction implied by its observed image pixel. Multiple correct matches constrain the camera view.'],
    ['Why identity and height matter', 'Longitude/latitude and an approximately located click are not enough if they refer to different wall corners. The zeroed BXR heights also limit geometric diversity. Clearer named features at verified heights would help separate calibration errors from imperfect image observations.']
  ],
  'Survey fly-through': [
    ['Reading the tour', 'The visual starts at the surveyed camera, visits the local origin and then the named reference points. The origin defines the coordinate system, not a second camera. The flight illustrates spatial relationships; its dashed coastline and buildings are simplified scene outlines.'],
    ['What remains exact', 'Coordinate labels come from the project KML and its local conversion. The moving viewpoint is an explanatory device. It does not measure architecture heights, reconstruct terrain or verify that a specific video click matches the surveyed reference.']
  ],
  'Digital twin': [
    ['Why a 3D venue helps', 'A twin can connect recognizable architecture to world coordinates and render a camera at a known state. Structural passes emphasize geometry instead of appearance. That is useful when real footage and the Mac render differ in lighting, water, textures or weather.'],
    ['Current versus planned use', 'The structural city render is available, but the current pose solver uses Python and surveyed points. A future twin comparison needs verified coordinates, camera transforms and independently identified features. Sending our estimates to Unreal alone would reproduce our assumptions rather than prove them correct.']
  ],
  'Focal length': [
    ['Reading the two views', 'The left frame holds the wider reference near 225 s. The right clip changes over the recorded interval, with HFOV readouts from existing estimates. Compare the amount of architecture in view and its image size, while remembering that the camera also pans.'],
    ['How the number relates to zoom', 'For a centred pinhole model, horizontal focal pixels equal image width divided by twice tan(HFOV/2). Relative magnification compares this focal value with the reference. It describes image projection, not a physical focal length in millimetres or a measured Canon zoom encoder.']
  ],
  'Lens distortion': [
    ['What the animation teaches', 'Two equal image-space gaps can correspond to different angular gaps when the lens mapping is nonlinear. The animation corrects the rays and intersects them with an explicitly known distance plane. The distance comes from that plane, not from the pixels alone.'],
    ['What the solver does today', 'The displayed distortion is illustrative. Lens-file variants were controlled experiments and did not become the default. Before using vendor coefficients, their normalization, direction of mapping and principal-point convention must agree with the implementation. Otherwise correcting distortion can worsen the camera estimate.']
  ],
  'Race footage': [
    ['The footage as a measurement', 'Static wall or island features move in the image when the camera pans, tilts or zooms. Their physical locations do not change. We follow those image movements and use the surveyed geometry to work backwards to the camera’s changing view.'],
    ['Limits of the evidence', 'Boat motion, wakes, reflections and changing waterlines are unsuitable as fixed references. A blurry or ambiguous landmark can remain consistently tracked but still be the wrong point. The camera solve inherits these observation errors unless independent checks expose them.']
  ],
  'The pipeline': [
    ['Three separate jobs', 'Tracking answers “where is this known feature in the image?” Smoothing makes bounded corrections to those observations. Camera estimation asks which orientation and field of view explain them from a fixed surveyed position. Each stage has a different error measure.'],
    ['Why the stages stay separate', 'We preserve the source measurements and missing-data decisions so later comparisons remain fair. The estimator does not feed its predicted points back as tracker evidence. Lens-model comparisons reuse frozen observations, avoiding a change in tracking being mistaken for a better camera model.']
  ],
  'Track points': [
    ['From a reference to a track', 'A person identifies named points in reference images. The tracker matches surrounding land texture and transfers those point locations through the estimated image transformation. Checked local optical flow carries the region between reference matches; it does not detect a new surveyed landmark from nothing.'],
    ['When to leave a gap', 'Reference and motion checks reject unsupported observations. If a region loses evidence or a point leaves the image, its position should become unavailable. Holding a stale marker or interpolating through that loss would look smoother while hiding an actual tracking failure.']
  ],
  'How OpenCV tracks': [
    ['Reading the feature animation', 'SIFT descriptors compare textured image patches. RANSAC looks for matches that agree with a common transformation and limits the influence of inconsistent candidates. A successful transformation transfers the annotated landmark pixels from the reference to the current view.'],
    ['What the diagnostic can establish', 'The displayed pair uses real 190/195 s image matches. It explains reference matching, not the full sequential optical-flow loop. Low transformation residuals show local image agreement, but they do not independently verify landmark identity or geographic correctness.']
  ],
  'Smooth points': [
    ['Reading the paired video', 'Both panels show the same source time. The left stream already includes bounded smoothing; the right adds supported short-gap recovery. The improvement visible here is fewer missing observations, not an exaggerated reduction of marker motion. The reported gap count covers the full 30 s replay.'],
    ['Why this is still offline', 'The reference bank includes images from later in the recording. Those references can help match the current image, but would not yet exist during a first live broadcast. A causal deployment must use references collected beforehand and test recovery without future recording access.']
  ],
  'How smoothing works': [
    ['Small jitter', 'The filter describes shared land-region translation, rotation and scale. It smooths those quantities using current and past samples, adapting more quickly to faster motion. Corrections to current landmark positions are capped at 1.5 full-resolution pixels, while perspective/deformation residuals are retained.'],
    ['Missing observations', 'Recovery is a different operation: it retries reference matching on the current image during a short region-wide loss. It needs image support and does not create coordinates by interpolation. The smoother resets on identity/segment changes, invalid geometry, time gaps or large jumps.']
  ],
  'Island continuity graph': [
    ['How to read the lanes', 'Each lane represents one island landmark from REF-09 through REF-15 over 165–195 s. Teal intervals are the original observations. Purple intervals add image-supported recovery. Pale intervals remain unavailable. Both panels already include smoothing, and their time axes are identical.'],
    ['What 9 to 2 measures', 'The count refers to short region-wide losses of up to 0.8 s, bounded by observed island frames. It excludes leading/trailing unknown periods and is not a count of every pale segment. All baseline coordinates are preserved; 745 island point-frames are added. More coverage alone does not prove accurate points.']
  ],
  'Estimate camera': [
    ['The fitting process', 'Known 3D points project to pixels for a candidate camera. Least-squares optimization changes pan, tilt, roll and focal/HFOV to reduce differences from measured pixels. Position stays fixed, the principal point is centred and distortion is disabled in the default model.'],
    ['Fit versus confidence', 'A small fit residual can coexist with wrong correspondences or biased geometry. Nearby planar landmarks can also weakly constrain some parameters. We therefore separate successful optimization from validated camera state, and use excluded features and independent clicks to assess generalization.']
  ],
  'How camera estimation works': [
    ['Watching the geometry', 'As the teaching camera pans, tilts or changes FOV, the same fixed world points project to different pixels. Matching projected locations to observed pixels constrains the view. Several points at diverse positions provide more information than one point or a narrow cluster.'],
    ['Why agreement is not automatically proof', 'This animation uses known synthetic coordinates and exact pinhole projection. Real measurements add uncertainty in survey position, point identity, lens behaviour and landmark height. A solver should also explain points excluded from fitting rather than only the points it was optimized to match.']
  ],
  'Camera demo': [
    ['What differs between the panels', 'The wireframe uses fixed 3D geometry. Left projects it with the first estimate throughout the clip. Right changes the camera state each frame, so the geometry follows the changing view. The right overlay comes from camera projection, not simply drawing tracked OpenCV pixels.'],
    ['How far this validates the result', 'Following the view supports consistency between the estimated state and the observations. It does not certify absolute yaw, pitch or roll because some reference points help fit that state. Stronger tests use independently checked excluded features, diverse views or calibrated reference camera measurements.']
  ],
  'Current evidence': [
    ['What the numbers mean', 'The 750 provisional fits cover 30 s at 25 fps. The 4.01 px figure is median BXR-6 camera-to-manual-click error on six reporting frames, with BXR-6 excluded from fitting. Across all five landmarks, median error is 5.32 px and p95 is 18.04 px.'],
    ['Where uncertainty remains', 'Fit-four camera-to-click median is 7.65 px, so metrics should not be mixed. BXR-7 has about 17.5 px disagreement with clicks despite tracker/camera agreement; its identity is image-limited. Absolute angles remain unverified. Package checks pass, but exported states retain valid=false.']
  ],
  'Next: island': [
    ['The missing input', 'Image tracks alone cannot provide geographic island pose. We need named physical island features with verified world coordinates and heights, matching the same pixels in the recording. Features at varied elevations and directions can strengthen the geometry beyond the waterfront references.'],
    ['A small next experiment', 'First establish a few unambiguous twin/video correspondences and solve one informative frame at the fixed camera position. Reserve other features for checking reprojection. If that fails, diagnose identity, height, coordinates or lens assumptions before expanding to a longer island sequence.']
  ],
  'Next demonstration': [
    ['Two different twin checks', 'Replaying estimated camera states in Unreal tests conversion and visual consistency. An independent comparison needs a separately established reference view or camera calibration with uncertainty. A twin camera initialized from the same estimates cannot serve as their independent ground truth.'],
    ['Whole-video output', 'The target is a state stream for the full recording, with timestamps and explicit unavailable intervals. Loss, cuts and featureless water need reliable invalid output rather than guessed angles. Expanding coverage should follow successful accuracy checks, not simply a longer attractive replay.']
  ],
  'Next: live system': [
    ['What has already run', 'The short 190–201 s live processing loop reads video, tracks, refines and estimates, matching the frozen replay numerically. The full 30 s estimator comparison uses replayed observations. Neither establishes sustained live performance over a complete race or real tracking-loss recovery.'],
    ['What to measure next', 'At 25 fps a new frame arrives every 40 ms. Measure total input-to-state delay, queues, sustained throughput and state availability, not only one function’s average time. Test causal references, cuts and genuine losses. After optimization, retest accuracy and false-valid outputs as well as speed.']
  ],
  'Thank you / Discussion': [
    ['Where feedback helps', 'The next decisions concern reliable 3D island evidence, independent camera-angle verification and the acceptable latency/availability trade-off for broadcast use. Those choices determine which small experiment should come before scaling to a full video or live input.'],
    ['Project takeaway', 'We have reproducible tracking/refinement experiments and a working provisional fixed-position camera-estimation pipeline. The remaining challenge is making the camera state trustworthy under varied evidence and operating conditions. The background animation is a decorative closing visual, not a tracking result.']
  ]
};
window.renderSlideNotes = function(title) {
  const omitNotes=['Team and Advisor','Agenda','Thank you / Discussion','Methodology','Next Steps'].includes(title);
  document.body.classList.toggle('no-slide-notes',omitNotes);
  document.getElementById('slide-notes').hidden=omitNotes;
  const entry=slideNotes[title];
  document.getElementById('notes-copy').textContent=entry?.[0] || 'No additional notes for this slide.';
  const details=document.getElementById('notes-details');
  details.replaceChildren();
  for(const [heading,copy] of slideDetails[title] || []) {
    const article=document.createElement('article'),h=document.createElement('h3'),p=document.createElement('p');
    h.textContent=heading;p.textContent=copy;article.append(h,p);details.append(article);
  }
  const sources=document.getElementById('notes-sources');
  sources.replaceChildren();
  for(const [label,url] of entry?.[1] || []) {
    const a=document.createElement('a');
    a.textContent=label;a.href=url;a.target='_blank';a.rel='noopener';sources.append(a);
  }
  document.getElementById('slide-notes').scrollTop=0;
};
